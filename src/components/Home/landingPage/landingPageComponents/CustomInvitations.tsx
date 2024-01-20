import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const data = [
  "/images/dashImage1.webp",
  "/images/dashImage2.webp",
  "/images/dashImage3.webp",
  "/images/dashImage4.webp",
  "/images/dashImage5.jpg",
];

export default function CustomInvitations() {
  const router = useRouter();

  return (
    <div
      className="h-[516px] sm:h-[693px]   bg-cover bg-no-repeat mt-[-100px]  xl:mt-[-142px] bg-[#F4F7FE] 5xl:bg_linear px-[20px]   bg-top max-2sm:h-auto  max-2sm:pt-[50px]	"
      style={{
        background: "url(/images/customeInvitationBanner.png)",
      }}
    >
      <Box className="flex flex-col items-center pt-14 gap-5  pt-[230px] max-sm:pt-[169px] max-2sm:pt-[100px]">
        <Typography
          className="text-[47px] font-bold text-white text-center max-sm:text-[28px]"
          variant="h2"
        >
          Create Custom Invitations with Ease
        </Typography>
        <Box className="flex flex-col items-center gap-2 ">
          <Typography className="text-[18px] font-medium text-white text-center">
            Customize invitations for any occasion with our easy-to-use
            Invitation customization tool.
          </Typography>
        </Box>

        <Button
          sx={{
            textTransform: "unset",
            fontSize: "14px",
            fontWeight: "500",
            color: "white",
            whiteSpace: "nowrap",
            opacity: "1",
            width: "180px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          className="bg-white text-black py-2"
          onClick={() => router.push("/login")}
        >
          Get Started
        </Button>
      </Box>

      <Box className=" items-center gap-[2%] justify-center mt-14  max-2sm:mt-12 hidden sm:flex">
        {data?.map((item: any, index: number) => {
          let width;
          switch (true) {
            case index === 1:
              width = 200;
              break;
            case index === 2:
              width = 242;
              break;
            case index === 3:
              width = 200;
              break;
            default:
              width = 169;
          }
          return (
            <Box
              key={index}
              sx={{
                width: `${width}px`,
                filter: " drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.25))",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img src={item} alt={item} />
            </Box>
          );
        })}
      </Box>
      <Box className="flex items-center gap-[2%] justify-center mt-10 mb-5  max-2sm:mt-12 sm:hidden">
        {data
          ?.filter((e: any, index: number) => index > 0 && index < 4)
          ?.map((item: any, index: number) => {
            let width;
            switch (true) {
              case index === 0:
                width = 200;
                break;
              case index === 1:
                width = 242;
                break;
              case index === 2:
                width = 200;
                break;
              default:
                width = 169;
            }
            return (
              <Box
                key={index}
                sx={{
                  width: `${width}px`,
                  filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.25))",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img src={item} alt={item} />
              </Box>
            );
          })}
      </Box>
    </div>
  );
}
