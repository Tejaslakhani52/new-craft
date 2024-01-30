import api from "@/src/clientApi/api";
import { PaymentProps, PurchaseItemProps } from "@/src/interface/payment_props";
import {
  removeUnusedSessions,
  setSessionVal,
} from "@/src/redux/action/AuthToken";
import { setPurchaseItems } from "@/src/redux/reducer/AuthDataReducer";
import { mainLoad } from "@/src/redux/reducer/actionDataReducer";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const url: string = "https://checkout.razorpay.com/v1/checkout.js";
const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

declare const fbq: Function;

interface PropsType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string | any;
  actionType: number;
}

export function RazorpayPage({ setOpen, amount, actionType }: PropsType) {
  const dispatch = useDispatch();
  const _paf = useSelector((state: any) => state.actions._paf);
  const [scriptUpdate, setScriptUpdate] = useState<number>(0);

  useEffect(() => {
    if (!scriptExists(url)) {
      loadScript(url)
        .then(() => {})
        .catch(() => {
          setScriptUpdate(scriptUpdate + 1);
        });
    }
  }, [scriptUpdate]);

  function scriptExists(url: string) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
  }

  const handleSubmit = async (event: React.MouseEvent<any> | any) => {
    event.preventDefault();
    setOpen(false);
    dispatch(mainLoad(true));
    api
      .razorpay({ p: _paf })
      .then((res) => {
        const options = {
          ...res,
          handler: (response: any) => {
            const datas = {
              id: response.razorpay_payment_id,
              m: "Razorpay",
            };
            setSessionVal("_pdf", JSON.stringify(datas));
            dispatch(mainLoad(true));
            api
              .webhook({ plan_id: _paf })
              .then((res) => {
                if (res.success) {
                  const val: PaymentProps[] = JSON.parse(_paf);
                  const purDatas: PurchaseItemProps[] = [];
                  val.forEach((_: any) => {
                    purDatas.push({ id: _.id, type: _.type });
                  });
                  dispatch(setPurchaseItems(purDatas));
                  fbq(
                    "track",
                    actionType ? "Purchase Subscription" : "Purchase Templates",
                    {
                      value: `${amount}`,
                      currency: "INR",
                    }
                  );
                  removeUnusedSessions();
                  toast.success(res.msg);
                  setOpen(false);
                  dispatch(mainLoad(false));
                } else {
                  toast.error(res.msg);
                  dispatch(mainLoad(false));
                }
              })
              .catch((error) => {
                dispatch(mainLoad(false));
                toast.error("Payment failed");
              });
          },
        };

        const rzp = new (window as any).Razorpay(options);

        rzp.open();
        if (rzp) {
          dispatch(mainLoad(false));
        }
      })
      .catch((error) => {
        dispatch(mainLoad(false));
        toast.error("Payment failed");
      });
  };

  return (
    <Box>
      <Button onClick={handleSubmit} className="w-[200px] mx-auto block">
        <img
          src={`${assetsUrl}/w_assets/images/plans/razorpay.png`}
          alt="razorpay"
        />
      </Button>
      <Box className="separator">
        <Box className="line" />
        <h2 className="mb-0">or</h2>
        <Box className="line" />
      </Box>
    </Box>
  );
}
