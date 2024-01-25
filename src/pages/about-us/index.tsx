import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import QuestionsTitle from "@/src/components/common/QuestionsTitle";
import FaqsBox from "@/src/components/common/FAQs";
import { handleEmailClick } from "@/src/commonFunction/emailCheck";

const CustomerSaying = dynamic(
  () =>
    import(
      "@/src/components/Home/landingPage/landingPageComponents/CustomerSaying"
    )
);
const CustomHead = dynamic(() => import("@/src/components/common/CustomHead"));
const GetTemplates = dynamic(
  () => import("@/src/components/common/GetTemplates")
);

const dEverything = [
  {
    icons: "/icons/about us/invitation.svg",
    name: "Invitation",
    path: "/invitation",
  },
  { icons: "/icons/about us/flyer.svg", name: "Flyer", path: "/flyers" },
  {
    icons: "/icons/about us/calendar.svg",
    name: "Calendar",
    path: "/calendar",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "BG Remove",
    path: "/",
  },
];

const dEverything2 = [
  { icons: "/icons/about us/bgRemove.svg", name: "Logo", path: "/logos" },
  { icons: "/icons/about us/quotes.svg", name: "Quotes", path: "/quotes" },
  {
    icons: "/icons/about us/invitation.svg",
    name: "Banner",
    path: "/banner",
  },
];

const dEverything3 = [
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Infographic",
    path: "/infographic",
  },
  {
    icons: "/icons/about us/calendar.svg",
    name: "Daily Post",
    path: "/templates/daily-post",
  },
  {
    icons: "/icons/about us/invitation.svg",
    name: "Wall Paper",
    path: "/templates/wallpaper",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Thumbnail",
    path: "/templates/youtube-thumbnail",
  },
];

const dEverything4 = [
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Business Card",
    path: "/business-card",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "YT Banner",
    path: "/templates/youtube-thumbnail",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Social Media Post",
    path: "/templates/instagram-post",
  },
];

const dEverything5 = [
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Certificate",
    path: "/s/certificate",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "Bio-Data",
    path: "/templates/bio-data-portrait",
  },
  {
    icons: "/icons/about us/resume.svg",
    name: "Resume",
    path: "/templates/resume-portrait",
  },
  {
    icons: "/icons/about us/bgRemove.svg",
    name: "birthday",
    path: "/birthday-invitation",
  },
];

const WeWork = [
  {
    icons: "/icons/about us/weWork1.svg",
    heading: "Turn customers into fans",
    text: "We know successful customers will translate  into success for our team.",
  },
  {
    icons: "/icons/about us/weWork2.svg",
    heading: "Continuously improve, every day",
    text: "We want to be better today than we were yesterday.",
  },
  {
    icons: "/icons/about us/weWork3.svg",
    heading: "Innovate where there is opportunity",
    text: "We encourage new ideas but realize we do not need to reinvent every wheel.",
  },
  {
    icons: "/icons/about us/weWork4.svg",
    heading: "Own individual efforts, but work as a team",
    text: "We are most effective when we leverage our individual strengths to power the team.",
  },
  {
    icons: "/icons/about us/weWork5.svg",
    heading: "Always share knowledge",
    text: "We believe in freely and sharing knowledge to build trust and ensure success.",
  },
  {
    icons: "/icons/about us/weWork6.svg",
    heading: "Celebrate our differences",
    text: "We seek to grow a diverse team with unique backgrounds and experiences to challenge.",
  },
];

export default function index() {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;
  const router = useRouter();
  return (
    <>
      <CustomHead
        heading={"About Us - Who We Are"}
        text="Discover the essence of our story and values. Explore our journey and mission."
      />
      <Box className="text-center pt-14 max-sm:pt-5 pb-12 px-[15px]">
        <Typography className="text-[15px]">ABOUT CRAFTYART</Typography>

        <Typography
          className="text_linear text-[32px] md:text-[45px] font-[700] mb-2"
          variant="h1"
        >
          Welcome to Our World of Design!
        </Typography>

        <Typography className="w-[70%] max-sm:w-full mx-auto">
          Crafty Art was born out of a passion for creativity and a vision to
          empower everyone to express themselves through beautiful design. Our
          journey began with the simple belief that art and design should be
          accessible to all, regardless of their background or experience.
        </Typography>
      </Box>

      <Box
        sx={{
          background:
            "url(https://assets.craftyart.in/w_assets/images/aboutusBanner.png)",
          display: "flex",
          justifyContent: "center",
        }}
        className="px-[15px] py-[150px] max-lg:py-[50px]"
      >
        <Box className="w-[80%] py-5 rounded-[10px] flex max-xl:w-[100%] flex-wrap">
          <Box className="w-full sm:w-[50%] lg:w-[25%] max-lg:mb-3 justify-center items-center flex flex-col">
            <Typography className="text-[40px] font-bold text-white">
              200 K+
            </Typography>
            <Typography className="text-[18px]  text-white whitespace-nowrap text-center">
              Designer's time saving
            </Typography>
          </Box>

          <Box className="w-full sm:w-[50%] lg:w-[25%] max-lg:mb-3 justify-center items-center flex flex-col">
            <Typography className="text-[40px] font-bold text-white">
              1 M+
            </Typography>
            <Typography className="text-[18px]  text-white whitespace-nowrap text-center">
              Monthly Designs Created
            </Typography>
          </Box>

          <Box className="w-full sm:w-[50%] lg:w-[25%] max-lg:mb-3 justify-center items-center flex flex-col">
            <Typography className="text-[40px] font-bold text-white">
              500 K+
            </Typography>
            <Typography className="text-[18px]  text-white whitespace-nowrap">
              Users
            </Typography>
          </Box>

          <Box className="w-full sm:w-[50%] lg:w-[25%] max-lg:mb-3 justify-center items-center flex flex-col">
            <Typography className="text-[40px] font-bold text-white">
              200 K+
            </Typography>
            <Typography className="text-[18px]  text-white whitespace-nowrap text-center">
              Invitation created every month
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="pt-[70px] pb-[20px]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600] mb-4"
        >
          What is Crafty Art?
        </Typography>

        <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center lg:flex-row flex-col">
          <Box className="flex-1  flex  max-lg:pb-5 max-lg:order-1">
            <img
              src={`${assetsUrl}/w_assets/images/whatCraftyart.png`}
              alt={"whatCraftyart"}
              className="object-contain w-[500px] max-lg:w-[400px] max-sm:w-full"
            />
          </Box>
          <Box className="flex-1 max-lg:order-2  max-lg:w-[100%]">
            <Box className="mb-5">
              <Typography className="mb-3">
                Crafty Art is an online graphic design tool or platform that
                allows users to create a wide range of graphic design, including
                invitations, logos, flyers, quotes, thumbnails, posters, banners
                and many more.
              </Typography>

              <Typography className="">
                It appears to be a versatile tool for designing various visual
                materials, making it a useful resource for individuals and
                businesses looking to create eye-catching and customized
                graphics for different purposes.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="py-[70px] max-sm:py-[30px] bg-[#F4F7FE]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] px-[15px] text-center font-[600] mb-4"
        >
          Design Everything As You Want
        </Typography>

        <Box className="py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[70%] mx-auto max-w-[2400px] ">
          <Box className="flex w-full flex-wrap gap-3 justify-between">
            {dEverything?.map((item, index: number) => (
              <Box
                key={index}
                className="flex gap-3 bg_linear  max-lg:flex-1 min-w-[150px] lg:w-[200px] p-[13px] justify-center rounded-[4px]"
                onClick={() => router.push(item?.path)}
              >
                <img
                  src={item?.icons}
                  alt={item?.name}
                  className="max-w-[25px] max-h-[25px]"
                />
                <Typography className="text-[#ffff] whitespace-nowrap">
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className="flex w-[80%] max-lg:w-full flex-wrap mx-auto gap-3 my-14 max-sm:my-5 justify-between">
            {dEverything2?.map((item, index: number) => (
              <Box
                key={index}
                className="flex gap-3 bg_linear max-lg:flex-1 min-w-[150px] lg:w-[200px] p-[13px] justify-center rounded-[4px]"
                onClick={() => router.push(item?.path)}
              >
                <img
                  src={item?.icons}
                  alt={item?.name}
                  className="max-w-[25px] max-h-[25px]"
                />
                <Typography className="text-[#ffff] whitespace-nowrap">
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className="flex w-full flex-wrap gap-3 justify-between">
            {dEverything3?.map((item, index: number) => (
              <Box
                key={index}
                className="flex gap-3 bg_linear max-lg:flex-1 min-w-[150px] lg:w-[200px] p-[13px] justify-center rounded-[4px]"
                onClick={() => router.push(item?.path)}
              >
                <img
                  src={item?.icons}
                  alt={item?.name}
                  className="max-w-[25px] max-h-[25px]"
                />
                <Typography className="text-[#ffff] whitespace-nowrap">
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className="flex w-[80%] max-lg:w-full flex-wrap mx-auto gap-3 my-14 max-sm:my-5 justify-between">
            {dEverything4?.map((item, index: number) => (
              <Box
                key={index}
                className="flex gap-3 bg_linear max-lg:flex-1 min-w-[150px] lg:w-[200px] p-[13px] justify-center rounded-[4px]"
                onClick={() => router.push(item?.path)}
              >
                <img
                  src={item?.icons}
                  alt={item?.name}
                  className="max-w-[25px] max-h-[25px]"
                />
                <Typography className="text-[#ffff] whitespace-nowrap">
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className="flex w-full flex-wrap gap-3 justify-between">
            {dEverything5?.map((item, index: number) => (
              <Box
                key={index}
                className="flex gap-3 bg_linear max-lg:flex-1 min-w-[150px] lg:w-[200px] p-[13px] justify-center rounded-[4px]"
                onClick={() => router.push(item?.path)}
              >
                <img
                  src={item?.icons}
                  alt={item?.name}
                  className="max-w-[25px] max-h-[25px]"
                />
                <Typography className="text-[#ffff] whitespace-nowrap">
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="py-[20px] ">
        <Box className="flex py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center lg:flex-row flex-col">
          <Box className="flex-1 max-lg:order-2  max-lg:w-[100%]">
            <Box className="mb-5">
              <Typography
                variant="h2"
                className="text-[#1C3048] text-[30px] font-[600] mb-3"
              >
                Our Mission?
              </Typography>
              <Typography className="mb-5">
                Our mission is to democratize design, making it easy for
                individuals and businesses to create visual content that
                inspires, communicates, and resonates. We're not just a software
                company; we're a team of artists, designers, and innovators
                committed to helping you unleash your creativity.
              </Typography>

              <Typography
                variant="h2"
                className="text-[#1C3048] text-[30px] font-[600] mb-3"
              >
                Our Vision?
              </Typography>

              <Typography className="">
                Crafty Art was born out of a passion for creativity and a vision
                to empower everyone to express themselves through beautiful
                design. Our journey began with the simple belief that art and
                design should be accessible to all, regardless of their
                background or experience.
              </Typography>
            </Box>
          </Box>

          <Box className="flex-1  flex  max-lg:pb-5 max-lg:order-1 justify-end">
            <img
              src={`${assetsUrl}/w_assets/images/ourMission.png`}
              alt={"ourMission"}
              className="object-contain w-[500px] max-lg:w-[400px] max-sm:w-full"
            />
          </Box>
        </Box>
      </Box>

      <Box className="sm:pt-[70px] pb-[20px]">
        <Typography
          variant="h2"
          className="text-[#1C3048] text-[30px] text-center font-[600] mb-4"
        >
          How We Work
        </Typography>
        <Typography className="text-center">
          We strive to embody our core values in all we do. And, as a
          remote-first organization, we believe values and culture don’t depend
          on being in the office.
        </Typography>

        <Box className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-between py-[30px] sm:py-[50px] px-[20px] w-full xl:w-[85%] mx-auto max-w-[2400px] items-center ">
          {WeWork?.map((item, index: number) => (
            <Box
              key={index}
              className="w-full bg-[#F4F7FE] p-[30px] h-full "
              sx={{ boxShadow: "0px 0px 10px rgba(28, 48, 72, 0.20)" }}
            >
              <img src={item?.icons} alt="icons" className="w-[35px]" />

              <Typography variant="h3" className="text-[20px] font-medium my-4">
                {item?.heading}
              </Typography>

              <Typography>
                We know successful customers will translate into success for our
                team.
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <GetTemplates
        heading="Design your dream party invitation with just a few clicks"
        text="start your creative journey today!"
        navigate="/"
      />

      <CustomerSaying />

      <Box
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "1000px",
        }}
        className="w-[100%] sm:w-[80%] lg:w-[60%] px-[20px]  mb-[100px]"
      >
        <QuestionsTitle
          text1={"Some Popular"}
          text2={"Questions/Answered"}
          text3=""
        />
        <Box sx={{ p: "20px" }}></Box>

        <FaqsBox
          heading="What is the pricing model for Crafty Art?"
          text="Crafty Art Pro offers various pricing plans, including free trials, subscriptions, and purchase single templates. With the free trial, users can access a limited set of resources or templates. However, by opting for a subscription plan, customers gain full access to customization features, a broader range of templates, and additional resources. Alternatively, users can choose to purchase a single template, allowing them to acquire a specific template or resource of their choice."
        />

        <FaqsBox
          heading="What is the difference between the Subscription Plan and the Single Template Purchase?"
          text={
            <>
              <Typography className="text-black max-sm:text-[15px]  max-2sm:text-[13px] mb-3">
                Subscription Plan: This plan provides access to all premium
                features, customization options, regular updates, and exclusive
                tools like the background remover and many more.. It is billed
                on a monthly, quarterly, or yearly basis, depending on your
                preference.
              </Typography>
              <Typography className="text-black max-sm:text-[15px] max-2sm:text-[13px]  ">
                Single Template Purchase: With this plan, you can buy a specific
                template for a one-time payment. This option grants you lifetime
                access to the chosen template.
              </Typography>
            </>
          }
        />

        <FaqsBox
          heading="How to Contact Crafty Art for any Subscription Related Query or Problems?"
          text={
            <>
              To contact Crafty Art regarding any subscription-related queries
              or other issues, you can reach out to them at
              <span
                className="text-[#5961F8] cursor-pointer"
                onClick={handleEmailClick}
              >
                {" "}
                craftyartapp@gmail.com
              </span>
              .
            </>
          }
        />

        <FaqsBox
          heading="How do I purchase a subscription of Crafty Art?"
          text={
            <>
              <Typography className="text-black max-sm:text-[15px] font-medium max-2sm:text-[13px] mb-3">
                There are two convenient ways to purchase a subscription from
                Crafty Art:
              </Typography>

              <Typography className="text-black max-sm:text-[15px] max-2sm:text-[13px] mb-3">
                1. Navigate to the "Pricing" section in the header. Here, you'll
                find three subscription plans - monthly, quarterly, and yearly.
                Choose the plan that suits your needs and proceed to purchase
                the subscription.
              </Typography>

              <Typography className="text-black max-sm:text-[15px] max-2sm:text-[13px]">
                2. Alternatively, select a premium template and click on the
                "Customize This Template" button. A pop-up will appear
                presenting two options: the first is to buy a subscription, and
                the second is to buy a single template. Opt for the "Buy a
                Subscription" option. After completing the subscription
                purchase, you will gain access to the full range of Crafty Art's
                offerings.
              </Typography>
            </>
          }
        />

        <FaqsBox
          heading="Is there a limit to how many templates I can purchase with the Single Template option?"
          text="No, there is no limit. You can purchase as many templates as you like, and each template comes with lifetime access."
        />

        <FaqsBox
          heading="How does the billing work for the Subscription Plan?"
          text="The Subscription Plan is billed based on the selected frequency (monthly, quarterly, or yearly). Users enjoy uninterrupted access to premium features as long as their subscription is active."
        />
      </Box>
    </>
  );
}
