import { encryptData } from "@/src/aes-crypto";
import api from "@/src/clientApi/api";
import { PaymentProps, PurchaseItemProps } from "@/src/interface/payment_props";
import {
  saveCardData,
  setPurchaseItems,
} from "@/src/redux/reducer/AuthDataReducer";
import {
  AddressElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AddPaymentMethod from "./components/AddPaymentMethod";
import DeleteCard from "./components/DeleteCard";
import EditCard from "./components/EditCard";
import SaveCardList from "./components/SaveCardList";
import { RootState } from "@/src/redux";
import { StripePaymentMethod } from "@/src/interface/stripePaymentMethod";
import { consoleLog } from "@/src/commonFunction/console";

interface AddressProps {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export const formatExpiryDate = (expMonth: number, expYear: number): string => {
  const formattedMonth = expMonth < 10 ? `0${expMonth}` : `${expMonth}`;
  const formattedYear = expYear.toString().slice(-2);

  return `${formattedMonth}/${formattedYear}`;
};

declare const fbq: Function;

interface PropsType {
  open?: boolean;
  countryCode: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string | any;
  actionType: number;
}

export default function Stripe({
  open,
  countryCode,
  setOpen,
  amount,
  actionType,
}: PropsType) {
  const _paf = useSelector((state: RootState) => state.actions._paf);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [selectedDefaultCard, setSelectedDefaultCard] =
    useState<StripePaymentMethod | null>(null);
  const [addNewOpen, setAddNewOpen] = useState<boolean>(false);
  const [openEditCard, setOpenEditCard] = useState<boolean>(false);
  const [openDeleteCard, setOpenDeleteCard] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const saveCard = useSelector((state: RootState) => state.auth.saveCardData);
  const [mainLoading, setMainLoading] = useState<boolean>(false);

  const getCard = () => {
    api.cardList().then((res) => {
      dispatch(saveCardData(res?.data?.data));
    });
  };

  useEffect(() => {
    if (!selectedDefaultCard) {
      setSelectedDefaultCard(saveCard?.[0]);
    }
  }, [saveCard]);

  const ProcessPay = (id: string) => {
    setMainLoading(true);
    api
      .stripe({ pi: id, _paf: encryptData(_paf) })
      .then((c) => {
        stripe
          ?.confirmCardPayment(c.client_secret)
          .then((data) => {
            if (data.error) {
              toast.error(`${data?.error?.message}`);
              setMainLoading(false);
            } else if (data.paymentIntent) {
              const datas = {
                id: data.paymentIntent.id,
                m: "Stripe",
              };
              setMainLoading(true);
              api
                .webhook({
                  _paf: encryptData(_paf),
                  _pdf: encryptData(JSON.stringify(datas)),
                })
                .then((data) => {
                  setMainLoading(false);
                  if (data.success) {
                    const val: PaymentProps[] = JSON.parse(_paf);
                    const purDatas: PurchaseItemProps[] = [];
                    val.forEach((_) => {
                      purDatas.push({ id: _.id, type: _.type });
                    });
                    dispatch(setPurchaseItems(purDatas));
                    fbq(
                      "track",
                      actionType
                        ? "Purchase Subscription"
                        : "Purchase Templates",
                      {
                        value: `${amount}`,
                        currency: countryCode === "IN" ? "INR" : "USD",
                      }
                    );
                    toast.success(data.msg);
                    setOpen(false);
                    setOpenEditCard(false);
                    setSelectedDefaultCard(null);
                    setOpenDeleteCard(false);
                  } else {
                    toast.error("Payment failed");
                  }
                })
                .catch((error) => {
                  toast.error("Payment failed");
                  setMainLoading(false);
                  setAddNewOpen(false);
                });
            } else {
              toast.error("Payment failed");
              setMainLoading(false);
              setAddNewOpen(false);
            }
          })
          .catch((err) => {
            toast.error("Payment failed");
            setMainLoading(false);
          });
      })
      .catch((err) => {
        consoleLog("stripe: ", err);
        toast.error("Payment failed");
        setAddNewOpen(false);
        setMainLoading(false);
      });
  };

  const handleSubmit = async () => {
    setMainLoading(true);
    if (selectedDefaultCard?.id) {
      const id = selectedDefaultCard?.id;
      ProcessPay(id);
      setMainLoading(true);
    } else {
      const billing_details: {
        name: string | undefined;
        email: string;
        address: AddressProps | any;
        phone: string | undefined;
      } = {
        name: undefined,
        email: userData ? userData.email : "",
        address: undefined,
        phone: undefined,
      };

      if (elements !== null) {
        const addressElement = await elements
          .getElement(AddressElement)!
          .getValue();
        if (addressElement.complete) {
          billing_details.address = addressElement.value.address;
          billing_details.name = addressElement.value.name;
          billing_details.phone = addressElement.value.phone;
        } else {
          toast.error("Please provide details.");
          setMainLoading(false);
          return;
        }
      }

      const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
        billing_details: billing_details,
        type: "card",
        card: elements?.getElement(CardNumberElement),
      } as any);

      if (error) {
        toast.error(error.message);
        setMainLoading(false);
        return;
      }

      const paymentMethodId = paymentMethod.id;

      if (!error) {
        ProcessPay(paymentMethodId);
      } else {
        toast.error(error.message);
        setMainLoading(false);
      }
    }
  };

  const handleDeletePaymentMethod = () => {
    setMainLoading(true);

    api
      .detach({
        pm: selectedDefaultCard?.id ?? "",
      })
      .then(() => {
        toast.success("Payment method delete successfully");
        setMainLoading(false);
        getCard();
        setOpenDeleteCard(false);
      })
      .catch(() => {
        toast.error("Failed to delete payment method.");
        setMainLoading(false);
      });
  };

  useEffect(() => {
    if (!open) {
      setOpenEditCard(false);
      setOpenDeleteCard(false);
      setAddNewOpen(false);
    }
  }, [open]);

  return !addNewOpen && saveCard?.length > 0 ? (
    <>
      {!openEditCard && (
        <SaveCardList
          selectedDefaultCard={selectedDefaultCard}
          setSelectedDefaultCard={setSelectedDefaultCard}
          setOpenEditCard={setOpenEditCard}
          setOpenDeleteCard={setOpenDeleteCard}
          setAddNewOpen={setAddNewOpen}
          setMainLoading={setMainLoading}
          mainLoading={mainLoading}
          handleSubmit={handleSubmit}
        />
      )}
      {openEditCard && (
        <EditCard
          setOpenEditCard={setOpenEditCard}
          selectedDefaultCard={selectedDefaultCard}
        />
      )}

      <DeleteCard
        setOpenDeleteCard={setOpenDeleteCard}
        openDeleteCard={openDeleteCard}
        handleDeletePaymentMethod={handleDeletePaymentMethod}
      />
    </>
  ) : (
    <AddPaymentMethod
      countryCode={countryCode}
      saveCard={saveCard}
      setAddNewOpen={setAddNewOpen}
      handleSubmit={handleSubmit}
      mainLoading={mainLoading}
    />
  );
}
