import Icons from "@/src/assets";
import api from "@/src/clientApi/api";
import { handleEmailClick } from "@/src/commonFunction/emailCheck";
import {
  useScreenHeight,
  useScreenWidth,
} from "@/src/commonFunction/screenWidthHeight";
import { RazorpayPage } from "@/src/components/payment/Razorpay";
import Stripe from "@/src/components/payment/Stripe";
import { PackageList } from "@/src/interface/currentPlane";
import { authCookiesGet, setSessionVal } from "@/src/redux/action/AuthToken";
import { openLogin } from "@/src/redux/reducer/actionDataReducer";
import { Box, Button, Radio, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { addDays, format } from "date-fns";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const CustomHead = dynamic(() => import("@/src/components/common/CustomHead"));
const FaqsBox = dynamic(() => import("@/src/components/common/FAQs"));
const GetTemplates = dynamic(
  () => import("@/src/components/common/GetTemplates")
);
const QuestionsTitle = dynamic(
  () => import("@/src/components/common/QuestionsTitle")
);
const DialogModal = dynamic(() => import("@/src/components/common/DialogBox"));

export const MarkTextRight = ({ text }: any) => {
  return (
    <Box sx={{ display: "flex", gap: "10px", alignItems: "center", mb: "9px" }}>
      <Icons.rightMarkGreenIcon svgProps={{ width: 18 }} />
      <Typography
        sx={{ color: "#1C3048", opacity: 1 }}
        className="text-[15px] max-sm:text-[14px]"
      >
        {text}
      </Typography>
    </Box>
  );
};

export const MarkTextWrong = ({ text }: any) => {
  return (
    <Box sx={{ display: "flex", gap: "10px", alignItems: "center", mb: "9px" }}>
      <Icons.wrongMarkRedIcon svgProps={{ width: 18 }} />
      <Typography
        sx={{ color: "#1C3048", opacity: 1 }}
        className="text-[15px] max-sm:text-[14px]"
      >
        {text}
      </Typography>
    </Box>
  );
};

export const IconsText = ({ text, image }: any) => {
  return (
    <Box className="flex items-center w-[33%] max-sm:w-[98%] mb-8 gap-2 max-sm:pl-[20px]">
      <img src={image} alt={text} className="w-[30px]" />

      <Typography className="mt-[3px]">{text}</Typography>
    </Box>
  );
};

const scrollToTop = () => {
  if (typeof window !== undefined) {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }
};

export default function index() {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  const screenHeight = useScreenHeight();
  const screenWidth = useScreenWidth();
  const [stripeTestPromise, setStripeTestPromise] = useState<any>(null);
  useEffect(() => {
    const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_STRIPE_KEY}`;
    const valStripe = loadStripe(PUBLIC_KEY);
    setStripeTestPromise(valStripe);
  }, []);

  const dispatch = useDispatch();

  const router = useRouter();
  const uId = authCookiesGet();
  const [planeType, setPlaneType] = useState<string>("monthly");
  const [pricePlaneData, setPricePlaneData] = useState<PackageList>([]);
  const [userCountryCode, setUserCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [priceShowData, setPriceShowData] = useState<any>();
  const [choosePlan, setChoosePlan] = useState<any>();
  const [endDate, setEndDate] = useState<any>("");
  const [openPriceDialog, setOpenPriceDialog] = useState<boolean>(false);
  const scrollContainerRef: React.RefObject<HTMLInputElement> | any =
    useRef(null);

  useEffect(() => {
    setSessionVal("_paf", choosePlan?.id.toString());
    const currentDate = new Date();
    if (typeof choosePlan?.validity === "number") {
      const futureDate = addDays(currentDate, choosePlan?.validity);
      const formattedDate = format(futureDate, "MMMM dd, yyyy");
      setEndDate(formattedDate);
    }
  }, [choosePlan]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getIp()
      .then((res) => {
        api.getCountryCode({ ip: res?.ip }).then((res: any) => {
          setUserCountryCode(res?.countryCode);

          api
            .getPlanData({
              currency: res?.countryCode === "IN" ? "INR" : "USD",
            })
            .then((response) => {
              setPricePlaneData(response?.subs);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
            });
        });
      })
      .then((error) => {
        // console.log("error: ", error);
      });
  }, []);

  useEffect(() => {
    if (planeType == "monthly") {
      setPriceShowData(pricePlaneData?.[1]);
    } else if (planeType == "quarterly") {
      setPriceShowData(pricePlaneData?.[0]);
    } else setPriceShowData(pricePlaneData?.[2]);
  }, [pricePlaneData, planeType]);

  useEffect(() => {
    setChoosePlan(priceShowData);
  }, [priceShowData]);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        if (screenWidth > 800) {
          window.scrollTo({
            top: 470,
            behavior: "smooth",
          });
        } else
          window.scrollTo({
            top: 850,
            behavior: "smooth",
          });
      }, 700);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth;
        }
      }, 1000);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 750) {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <CustomHead
        heading="Crafty Art Plans & Pricing | Unlock Your Creative Journey Today!"
        text="Unleash Your Creativity with Crafty Art! Explore Affordable Plans & Pricing. Transform Ideas into Masterpieces. Join Now!"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "1. What pricing plans does Crafty Art offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Crafty Art offers different pricing plans to cater to various needs. These typically include a free plan with basic features and paid plans with additional benefits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "2. What are the benefits of a premium subscription?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As a premium user, you can download unlimited Crafty Art assets and access various premium services.",
                  },
                },
                {
                  "@type": "Question",
                  name: "3. Why do I have to purchase Crafty Art Pro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "With the Crafty Art Pro subscription, you can unlock unlimited access to premium services and features.",
                  },
                },
                {
                  "@type": "Question",
                  name: "4. Are my downloads unlimited as a premium user?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, as a premium user, you have unlimited downloads. There are no limitations on the use of Crafty Art assets, templates, and the Background Remover Tool.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[95%] mx-auto max-w-[2400px] items-center lg:flex-row flex-col">
        <Box className="flex-1 flex justify-center max-lg:order-2  max-lg:w-[100%]">
          <Box className="w-[90%] flex  flex-col gap-[20px]   max-lg:w-[8 0%] max-sm:w-[100%]">
            <Typography
              className="text-[28px] font-semibold text-black max-lg:text-[22px]  max-sm:text-center"
              variant="h2"
            >
              Turning Imagination into Innovation
            </Typography>
            <p>
              Crafty Art is the ultimate graphic design tool that empowers
              creative professionals, freelancers, and businesses to bring their
              visions to life with ease. Our pricing plans are designed to cater
              to a wide range of users, from individuals working on personal
              projects to enterprises in need of professional design solutions.
              Select the plan that best fits your needs and join our community
              of inspired designers.
            </p>
            <Box className="flex w-full gap-3 flex-wrap">
              <Button
                style={{
                  background:
                    "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
                  width: "fit-content",
                  textTransform: "unset",
                  borderRadius: "7px",
                  color: "white",
                  fontWeight: "500",
                }}
                className="bg_linear py-[10px] px-[20px] max-sm:w-full   text-[14px] 2sm:text-[16px]"
                onClick={scrollToTop}
              >
                See Pricing Plan
              </Button>

              <Button
                style={{
                  background: "#E9EDF6",
                  width: "fit-content",
                  textTransform: "unset",
                  borderRadius: "7px",
                  fontWeight: "500",
                }}
                className="bg_linear text-[#1C3048] py-[10px] px-[20px] max-sm:w-full   text-[14px] 2sm:text-[16px] "
                onClick={() => {
                  if (uId) {
                    router.push("/");
                  } else dispatch(openLogin(true));
                }}
              >
                Start your FREE trial
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="flex-1  flex justify-center max-lg:pb-5 max-lg:order-1">
          <img
            src="/images/plans.png"
            alt="plans"
            className="object-contain w-[450px] max-lg:w-[400px] max-sm:w-full"
          />
        </Box>
      </Box>

      <Box className="h-[463px] bg_linear max-lg:px-[20px] max-sm:h-auto max-sm:pb-[100px]">
        <Box className="flex flex-col items-center pt-14 gap-5">
          <Typography
            className="text-[40px] font-bold	text-white text-center max-sm:text-[30px]"
            variant="h1"
          >
            Super simple pricing
          </Typography>
          <Box className="flex flex-col items-center gap-10 ">
            <Typography className="text-[18px] font-medium	text-white text-center">
              To enjoy all the features of Crafty Art with create design faster
            </Typography>

            <Box
              className="flex items-center gap-[12px] p-[5px] rounded-[5px]"
              sx={{ border: "1.5px solid #FFF" }}
            >
              <Button
                className={`capitalize text-[17px] px-[10px] sm:px-[20px] ${
                  planeType === "monthly"
                    ? "bg-[white] text-[#2EC6B8]"
                    : "bg-[transparent] text-[white]"
                } `}
                onClick={() => setPlaneType("monthly")}
              >
                Monthly
              </Button>
              <Box className="w-[2px] bg-[#FFF] h-[30px]"></Box>
              <Button
                className={`capitalize text-[17px] px-[10px] sm:px-[20px] ${
                  planeType === "quarterly"
                    ? "bg-[white] text-[#2EC6B8]"
                    : "bg-[transparent] text-[white]"
                } `}
                onClick={() => setPlaneType("quarterly")}
              >
                Quarterly
              </Button>
              <Box className="w-[2px] bg-[#FFF] h-[30px]"></Box>
              <Button
                className={`capitalize text-[17px] px-[10px] sm:px-[20px] ${
                  planeType === "yearly"
                    ? "bg-[white] text-[#2EC6B8]"
                    : "bg-[transparent] text-[white]"
                } `}
                onClick={() => setPlaneType("yearly")}
              >
                Yearly
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        className="w-full scroll_none max-sm:px-[15px] pb-[30px] sm:w-[95%]  xl:w-[70%]  mx-auto mt-[-150px] max-lg:mt-[-125px] max-sm:mt-[-67px] flex sm:justify-center gap-[15px] sm:gap-[30px] overflow-auto"
        ref={scrollContainerRef}
        sx={{ transition: "1s all", scrollBehavior: "smooth" }}
      >
        <Box
          className="bg-[white]  min-w-[360px] rounded-[15px] p-[30px] pt-[52px] "
          sx={{
            border: "1px solid #ABB2C7",
            boxShadow: " 0px 4px 20px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography
            variant="h3"
            className="text-[#1C3048] text-[24px] font-[600] pb-[20px]"
          >
            Free
          </Typography>

          <Typography className="mb-8 max-sm:text-[14px]">
            Utilize Your Endless Creativity with Crafty Art Unlimited Downloads,
            No Limitations!
          </Typography>

          <Typography>
            <span className="text-[30px] text-[#1C3048] font-[700]">
              {userCountryCode === "IN" ? "₹" : "$"}0
            </span>{" "}
            /year
          </Typography>

          <Typography className="text-[#1C3048] font-[600] mt-4 mb-4 ">
            Everything you need is Free
          </Typography>

          <Box className="min-h-[660px]">
            <MarkTextRight text="Access to over 2,000+ templates" />
            <MarkTextRight text="100% fully customizable" />
            <MarkTextRight text="Access of Latest Designs" />
            <MarkTextRight text="Easy Drag-and-drop interface" />
            <MarkTextRight text="Access to over 5,000+ variety of Backgrounds" />
            <MarkTextRight text="Smooth and Sleek Editor" />
            <MarkTextRight text="Ability to upload your own images and assets" />
            <MarkTextRight text="Design with custom dimensions" />
            <MarkTextRight text="Access to over 3,000+ design elements" />
            <MarkTextRight text="Edit and Download on the go" />
            <MarkTextRight text="Access to over 1,000+ different font styles" />
            <MarkTextWrong text="Ads-free content" />
            <MarkTextWrong text="Watermark Remove" />
            <MarkTextWrong text="Free Customer Support" />
            <MarkTextWrong text="Background Remover" />
          </Box>

          <Box className="flex justify-center">
            <Button
              style={{
                background: "#E9EDF6",
                width: "fit-content",
                textTransform: "unset",
                borderRadius: "5px",
                fontWeight: "500",
              }}
              className="bg_linear max-sm:w-full text-[#1C3048] w-[80%] py-[10px] px-[20px]  max-lg:mx-auto text-[14px] 2sm:text-[16px]"
              onClick={() => router.push("/")}
            >
              Start Free Trial
            </Button>
          </Box>
        </Box>

        {/* 1212121221121212121212121******************************************** */}

        <Box
          className="bg-[white] min-w-[360px] rounded-[15px] py-[20px] border_linear"
          sx={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box className="flex justify-end">
            <span
              style={{
                background: "url(/images/bestValue.svg)",
                backgroundRepeat: "no-repeat",
                padding: "5px 5px 5px 25px",
                textAlign: "right",
                backgroundSize: "cover",
                fontSize: "14px",
                color: "white",
              }}
            >
              {priceShowData?.offer_msg ?? "Recommended"}
            </span>
          </Box>
          <Box className="px-[20px]">
            <Typography
              variant="h3"
              className="text-[#1C3048] text-[24px] font-[600] pb-[20px] flex items-center gap-3"
            >
              Crafty Art Pro
              <Icons.pricingIcon svgProps={{ width: 30 }} />
            </Typography>

            <Typography className="mb-8 max-sm:text-[14px]">
              Utilize Your Endless Creativity with Crafty Art Unlimited
              Downloads, No Limitations!
            </Typography>

            <Typography>
              <span className="text-[30px] text-[#1C3048] font-[700]">
                {priceShowData?.offer_price}
              </span>{" "}
              /{priceShowData?.package_name}
            </Typography>

            <Typography className="text-[#1C3048] font-[600] my-4">
              Everything you need is Free
            </Typography>

            <Box className="min-h-[660px]">
              <MarkTextRight text="Watermark Remover" />
              <MarkTextRight text="Background Remover" />
              <MarkTextRight text="Get high resolution templates" />
              <MarkTextRight text="Access to over 10,000+ templates" />
              <MarkTextRight text="100% fully customizable" />
              <MarkTextRight text="Full access of Latest Designs" />
              <MarkTextRight text="Easy Drag-and-drop interface" />
              <MarkTextRight text="Access to over 5,000+ variety of Backgrounds" />
              <MarkTextRight text="Smooth and Sleek Editor" />
              <MarkTextRight text="Ability to upload your own images and assets" />
              <MarkTextRight text="Design with custom dimensions" />
              <MarkTextRight text="Access to over 3,000+ design elements" />
              <MarkTextRight text="Ads-free content" />
              <MarkTextRight text="24/7 Customer Support" />
              <MarkTextRight text="Ability to save designs as templates for future use" />
              <MarkTextRight text="Edit and Download on the go" />
              <MarkTextRight text="Share and publish anywhere" />
              <MarkTextRight text="Access to over 1,000+ different font styles" />
            </Box>

            <Box className="flex justify-center">
              {uId ? (
                <Button
                  style={{
                    background:
                      "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
                    width: "fit-content",
                    textTransform: "unset",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "500",
                  }}
                  className="bg_linear max-sm:w-full py-[10px] mb-4 px-[20px]  w-[80%] max-lg:mx-auto text-[14px] 2sm:text-[16px]  "
                  onClick={() => setOpenPriceDialog(true)}
                >
                  Get Started
                </Button>
              ) : (
                <Button
                  style={{
                    background:
                      "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
                    width: "fit-content",
                    textTransform: "unset",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "500",
                  }}
                  className="bg_linear max-sm:w-full py-[10px] w-[80%] mb-4 px-[20px]  max-lg:mx-auto text-[14px] 2sm:text-[16px]  "
                  onClick={() => {
                    // router.push("login");
                    dispatch(openLogin(true));
                  }}
                >
                  Get Started
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="sm:w-[80%] lg:w-[60%] mx-auto px-[15px] mt-[50px]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600]"
        >
          Premium plans include
        </Typography>

        <Box className="flex my-[30px] justify-between flex-wrap">
          <IconsText
            image="/icons/premiumPlans/full_license.svg"
            text="Full License"
          />

          <IconsText
            image="/icons/premiumPlans/premium_content.svg"
            text="Premium content"
          />

          <IconsText
            image="/icons/premiumPlans/newAssets.svg"
            text="New assets daily"
          />

          <IconsText
            image="/icons/premiumPlans/stunning_temp.svg"
            text="10000+ Stunning templates"
          />

          <IconsText image="/icons/premiumPlans/ad_free.svg" text="Ad free" />

          <IconsText
            image="/icons/premiumPlans/unlimited_fonts.svg"
            text="Unlimited fonts"
          />

          <IconsText
            image="/icons/premiumPlans/brand_kit.svg"
            text="Brand Kit"
          />

          <IconsText
            image="/icons/premiumPlans/caricature.svg"
            text="Caricature"
          />

          <IconsText
            image="/icons/premiumPlans/newAssets.svg"
            text="1M+ Elements"
          />
        </Box>
      </Box>

      <Box className="py-[50px]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600] mb-4"
        >
          Why Choose Crafty Art ?
        </Typography>

        <Typography className="text-center max-sm:w-[90%] w-[70%] mx-auto text-[15px]">
          At CraftyArt, we understand that choosing the right pricing plan for
          your creative needs is a significant decision. We offer a range of
          plans tailored to meet the unique requirements of artists, creators,
          and enthusiasts. Here's why you should choose Crafty Art for your
          creative journey.
        </Typography>
        <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center lg:flex-row flex-col">
          <Box className="flex-1 max-lg:order-2  max-lg:w-[100%]">
            <Box className="mb-5">
              <Typography
                className="text-[18px] text_linear font-semibold text-black max-lg:text-[18px]  mb-2 "
                variant="h3"
              >
                User-Friendly Interface:
              </Typography>
              <Typography className="font-medium">
                Crafty Art is designed for both beginners and experts, offering
                an intuitive experience for all users.
              </Typography>
            </Box>
            <Box className="mb-5">
              <Typography
                className="text-[18px] text_linear font-semibold text-black max-lg:text-[18px]  mb-2 "
                variant="h3"
              >
                Regular Updates:
              </Typography>
              <Typography className="font-medium">
                Stay at the forefront of design trends with our frequent updates
                and new features.
              </Typography>
            </Box>
            <Box className="mb-5">
              <Typography
                className="text-[18px] text_linear font-semibold text-black max-lg:text-[18px]  mb-2 "
                variant="h3"
              >
                Expansive Library:
              </Typography>
              <Typography className="font-medium">
                Access a wide array of templates and stock assets to ignite your
                creative process.
              </Typography>
            </Box>
            <Box className="mb-5">
              <Typography
                className="text-[18px] text_linear font-semibold text-black max-lg:text-[18px]  mb-2 "
                variant="h3"
              >
                Secure Platform:
              </Typography>
              <Typography className="font-medium">
                Rest easy knowing your design projects are safe and sound on our
                secure and reliable platform.
              </Typography>
            </Box>
            <Box className="mb-5">
              <Typography
                className="text-[18px] text_linear font-semibold text-black max-lg:text-[18px]  mb-2 "
                variant="h3"
              >
                Excellent Customer Support:
              </Typography>
              <Typography className="font-medium">
                Our knowledgeable support team is always ready to assist you in
                realizing your design goals.
              </Typography>
            </Box>
          </Box>
          <Box className="flex-1  flex justify-end max-lg:pb-5 max-lg:order-1">
            <img
              src={`${assetsUrl}/w_assets/images/whyChooseCraftyArt.png`}
              alt={"whyChooseCraftyArt"}
              className="object-contain w-[500px] max-lg:w-[400px] max-sm:w-full"
            />
          </Box>
        </Box>
      </Box>

      <Box className="">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600] mb-4"
        >
          Additional Features:
        </Typography>

        <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center flex-wrap gap-[20px]">
          <Box className="flex-1 bg-[#F4F7FE] p-[15px] rounded-[10px] mb-2 max-lg:min-h-[270px] min-w-[150px]">
            <img
              src={`${assetsUrl}/w_assets/images/plans/adF1.png`}
              alt=""
              className="w-auto max-h-[140px] block mx-auto mb-3"
            />

            <Typography
              variant="h3"
              className="text-center font-semibold text-[16px]"
            >
              Custom Branding
            </Typography>

            <Typography className="text-[14px] text-center">
              Personalize your designs with your brand's colors, logos, and
              fonts.
            </Typography>
          </Box>
          <Box className="flex-1 bg-[#F4F7FE] p-[15px] rounded-[10px] mb-2 max-lg:min-h-[270px] min-w-[150px]">
            <img
              src={`${assetsUrl}/w_assets/images/plans/adF2.png`}
              alt=""
              className="w-auto max-h-[140px] block mx-auto mb-3"
            />

            <Typography
              variant="h3"
              className="text-center font-semibold text-[16px]"
            >
              Collaboration
            </Typography>

            <Typography className="text-[14px] text-center">
              Invite team members to work together seamlessly on projects.
            </Typography>
          </Box>
          <Box className="flex-1 bg-[#F4F7FE] p-[15px] rounded-[10px] mb-2 max-lg:min-h-[270px] min-w-[150px]">
            <img
              src={`${assetsUrl}/w_assets/images/plans/adF3.png`}
              alt=""
              className="w-auto max-h-[140px] block mx-auto mb-3"
            />

            <Typography
              variant="h3"
              className="text-center font-semibold text-[16px]"
            >
              Advanced Export Options
            </Typography>

            <Typography className="text-[14px] text-center">
              Export in various formats, including high-resolution files for
              printing.
            </Typography>
          </Box>
          <Box className="flex-1 bg-[#F4F7FE] p-[15px] rounded-[10px] mb-2 max-lg:min-h-[270px] min-w-[150px]">
            <img
              src={`${assetsUrl}/w_assets/images/plans/adF4.png`}
              alt=""
              className="w-auto max-h-[140px] block mx-auto mb-3"
            />

            <Typography
              variant="h3"
              className="text-center font-semibold text-[16px]"
            >
              Priority Support
            </Typography>

            <Typography className="text-[14px] text-center">
              Get fast, dedicated assistance from our support team.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="py-[50px]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600] mb-4"
        >
          Ready to Elevate Your Graphic Design?
        </Typography>

        <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center lg:flex-row flex-col">
          <Box className="flex-1 max-lg:order-2  max-lg:w-[100%]">
            <Box className="mb-5">
              <Typography className="mb-3">
                Crafty Art is your all-in-one solution for creating captivating
                visuals. Choose the plan that best suits your needs and join the
                ranks of satisfied designers who have transformed their creative
                process with CraftyArt.
              </Typography>

              <Typography className="">
                Still have questions or need a custom solution for your
                organization? Please don't hesitate to contact us at
                <span
                  className="text-[#5961F8] cursor-pointer"
                  onClick={handleEmailClick}
                >
                  {" "}
                  craftyartapp@gmail.com{" "}
                </span>
                for more information, personalized assistance, and enterprise
                pricing options.
              </Typography>
            </Box>
          </Box>
          <Box className="flex-1  flex justify-end max-lg:pb-5 max-lg:order-1">
            <img
              src={`${assetsUrl}/w_assets/images/plans/rgd.png`}
              alt={""}
              className="object-contain w-[500px] max-lg:w-[400px] max-sm:w-full"
            />
          </Box>
        </Box>
      </Box>

      <GetTemplates
        heading="Design your dream posters today and take your brand to the next level with Premium!"
        text="Get started now with our customizable templates."
        navigate="/templates/"
      />

      <Box
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "1000px",
        }}
        className="w-[100%] sm:w-[80%] lg:w-[60%] px-[20px] my-[30px] lg:my-[100px]"
      >
        <QuestionsTitle
          text1={"Some Popular"}
          text2={"Questions/Answered"}
          text3=""
        />
        <Box sx={{ p: "20px" }}></Box>

        <FaqsBox
          heading="1. What pricing plans does Crafty Art offer?"
          text="Crafty Art offers different pricing plans to cater to various needs. These typically include a free plan with basic features and paid plans with additional benefits."
        />
        <FaqsBox
          heading="2. What are the benefits of a premium subscription?"
          text="As a premium user you can download unlimited Crafty Art assets, and various services."
        />

        <FaqsBox
          heading="3. Why do i have to purchase Crafty Art Pro?"
          text="With the premium user, you can access unlimited service of Crafty Art Pro."
        />

        <FaqsBox
          heading="4. Are my downloads unlimited as a premium user?"
          text="Yes, as a premium user, you have unlimited downloads. There is no limitations on the use of Crafty Art assets, templates,
          and the Background Remover Tool."
        />
      </Box>

      <DialogModal
        open={openPriceDialog}
        setOpen={setOpenPriceDialog}
        className="w-[100%] lg:w-[80%] xl:w-[1000px]"
      >
        <Box className="flex max-md:flex-col rounded-[8px] bg-[#F4F7FE] overflow-hidden">
          <Box className="md:w-[50%] p-[30px] max-sm:p-[10px] bg-white">
            <Typography variant="h2" className="font-medium text-[22px] mb-2">
              Choose your plan
            </Typography>
            <Typography className="text-[#ABB2C7] text-[14px]  sm:w-[80%] ">
              Access all assets, templates, integrations and{" "}
              <span className="font-[700]"> Premium support.</span>
            </Typography>

            <Box className="mt-[20px]">
              {pricePlaneData?.map((item: any, index: number) => (
                <Box
                  key={index}
                  className="flex items-start mb-3 cursor-pointer"
                  onClick={() => setChoosePlan(item)}
                >
                  <Radio
                    color="default"
                    checked={item?.offer_price === choosePlan?.offer_price}
                  />
                  <Box className="py-[7px]">
                    <Typography className="font-semibold">
                      {item?.package_name}
                    </Typography>

                    <Box className="flex gap-2">
                      {item?.has_offer ? (
                        <Typography className="text-[#ABB2C7] text-[13px] line-through	">
                          {item?.actual_price}
                        </Typography>
                      ) : (
                        ""
                      )}

                      <Typography className="text-[#ABB2C7] text-[13px] ">
                        {item?.offer_price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="flex justify-between mb-2">
              <Typography>Ends on</Typography>
              <Typography>{endDate}</Typography>
            </Box>

            <Box className="flex justify-between">
              <Typography className="font-semibold">Due today</Typography>
              <Typography className="font-semibold">
                {choosePlan?.offer_price}
              </Typography>
            </Box>
          </Box>

          <Box
            className="md:w-[50%] p-[30px] max-sm:p-[10px] overflow-auto custom_scroll"
            sx={{
              maxHeight:
                screenWidth < 600
                  ? `${screenHeight}px`
                  : `${screenHeight - 150}px`,
            }}
          >
            <Typography variant="h2" className="font-medium text-[22px] mb-5">
              Finalize Payment
            </Typography>
            {userCountryCode === "IN" && (
              <RazorpayPage
                selectPaln={choosePlan}
                setOpen={setOpenPriceDialog}
              />
            )}

            <Elements stripe={stripeTestPromise}>
              <Stripe
                countryCode={userCountryCode}
                setOpen={setOpenPriceDialog}
              />
            </Elements>
          </Box>
        </Box>
      </DialogModal>

      {isLoading && (
        <main className="main">
          <span className="loader_span"></span>
        </main>
      )}
    </div>
  );
}
