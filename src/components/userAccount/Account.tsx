import Icons from "@/src/assets";
import api from "@/src/clientApi/api";
import { useScreenHeight } from "@/src/commonFunction/screenWidthHeight";
import { authCookiesGet, userPremium } from "@/src/redux/action/AuthToken";
import { setPurchaseItems } from "@/src/redux/reducer/AuthDataReducer";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PaymentHistory from "./components/PaymentHistory";
import PersonalInfo from "./components/PersonalInfo";
import Subscription from "./components/Subscription";
import TemplateHistory from "./components/TemplateHistory";

interface AccountProps {
  defaultTab: string;
}

export const sidebarMenu = [
  {
    name: "Personal Info",
    icons: "/icons/premiumPlans/profiile.svg",
    activeIcon: "/icons/premiumPlans/profileActive.svg",
    path: "/profile",
  },
  {
    name: "Subscription",
    icons: "/icons/premiumPlans/subscribe.svg",
    activeIcon: "/icons/premiumPlans/subscribeActive.svg",
    path: "/",
  },
  {
    name: "Payment History",
    icons: "/icons/premiumPlans/paymentHistory.svg",
    activeIcon: "/icons/premiumPlans/paymentHistoryActive.svg",
    path: "/",
  },
  {
    name: "Template History",
    icons: "/icons/premiumPlans/paymentHistory.svg",
    activeIcon: "/icons/premiumPlans/paymentHistoryActive.svg",
    path: "/",
  },
];

const Account: React.FC<AccountProps> = ({ defaultTab }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const uid = authCookiesGet();
  const getData = authCookiesGet();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [imageBaseUrl, setImageBaseUrl] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [currentPlan, setCurrentPlan] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const screenHeight = useScreenHeight();

  useEffect(() => {
    api
      .getUserData({ user_id: uid })
      .then(({ user, url, purDatas }) => {
        dispatch(setPurchaseItems(purDatas));
        userPremium(`${user?.is_premium}`);
        setImageBaseUrl(url);
        setUserProfile(user);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const ProfileImage = () => {
    return userProfile?.photo_uri !== "null" && userProfile?.photo_uri ? (
      userProfile?.photo_uri.includes("googleusercontent") ? (
        <img
          src={`${userProfile?.photo_uri}`}
          alt="Selected file preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <img
          src={`${imageBaseUrl}${userProfile?.photo_uri}`}
          alt="Selected file preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )
    ) : (
      <p
        style={{
          background:
            "linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontSize: "23px",
          textTransform: "capitalize",
        }}
      >
        {userProfile?.name?.charAt(0)}
      </p>
    );
  };

  useEffect(() => {
    api
      .getCurrentPlan()
      .then((currentPlanData) => {
        console.log("currentPlanData: ", currentPlanData);
        setLoading(false);
        setCurrentPlan(currentPlanData);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [getData]);

  const accountComponents: any = {
    "Personal Info": <PersonalInfo />,
    Subscription: <Subscription userSubscription={currentPlan} />,
    "Payment History": <PaymentHistory userSubscription={currentPlan} />,
    "Template History": <TemplateHistory userSubscription={currentPlan} />,
  };

  return (
    <Box className="">
      <Box
        className="2md:w-[320px] max-2md:mx-auto 2md:fixed left-0 top-[72px] bottom-0 bg-white"
        sx={{
          height: { xs: `auto `, md: `${screenHeight - 65}px` },
          borderRight: { md: "1px solid #D9D9D9" },
        }}
      >
        <Box
          sx={{ borderBottom: { md: "1px solid #D9D9D9" } }}
          className="py-[30px] pl-[20px] max-2md:hidden"
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                overflow: "hidden",
              }}
            >
              <ProfileImage />
            </div>
            <div>
              <h4 className="mb-0">
                {userProfile?.name || userProfile?.displayName}
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  opacity: "0.7",
                  maxWidth: "173px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  marginBottom: "0",
                }}
              >
                {userProfile?.email}
              </p>
            </div>
          </Box>
        </Box>
        <Box className="pt-[20px] max-2md:px-[8px] gap-2 px-[15px] max-2md:flex justify-between border-b   overflow-auto scroll_none bg-white">
          {sidebarMenu?.map((item, index: number) => (
            <Box
              key={index}
              className={`${
                activeTab === item?.name && "max-2md:border_b_linear"
              }`}
            >
              <Box
                className={`flex cursor-pointer px-1 py-3 2md:py-3 2md:px-3 w-full  hover:bg-[#F4F7FE] ${
                  router.pathname === item.path
                    ? " bg-[#F4F7FE] "
                    : "bg-transparent"
                }    rounded-[4px]`}
                onClick={() => setActiveTab(item?.name)}
              >
                <Box className="flex w-full">
                  <Box className="w-[40px] max-2md:hidden">
                    <img
                      src={
                        activeTab === item?.name ? item.activeIcon : item.icons
                      }
                      alt="Icons"
                      className="max-w-[20px] max-h-[20px]"
                    />
                  </Box>
                  <Typography
                    className={`text-[15px] font-medium whitespace-nowrap ${
                      activeTab === item?.name
                        ? " active_text_linear"
                        : "text-black opacity-60"
                    }`}
                  >
                    {item.name}
                  </Typography>
                  {item.name === "Templates" && (
                    <Icons.rightArrowIcon svgProps={{ width: 6 }} />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="2md:ml-[320px] 2md:mt-[70px] px-[10px] 2md:px-[50px] py-[30px]">
        {accountComponents?.[activeTab]}
      </Box>

      {loading && (
        <main className="main">
          <span className="loader_span"></span>
        </main>
      )}
    </Box>
  );
};

export default Account;
