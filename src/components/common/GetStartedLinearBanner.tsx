import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface props {
  heading: string;
  text: string;
  image: any;
  buttonName: string;
  navigate: string;
}

export default function GetStartedLinearBanner(props: props) {
  const router = useRouter();
  return (
    <Box
      sx={{
        background:
          "linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",

        display: "flex",
        alignItems: "center",
        margin: "10px auto",
        width: "100%",
        overflow: "hidden",
      }}
      className="lg:pl-[80px]  max-lg:px-[20px] h-auto sm:h-[420px] max-sm:py-[50px]"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
        className="w-full lg:w-[57%] max-lg:items-center "
      >
        <Typography
          sx={{
            color: "#ffffff",
            width: "100%",
            fontWeight: "600",
            lineHeight: "48px",
          }}
          className="max-lg:text-center text-[30px] sm:text-[40px]"
          variant="h1"
        >
          {props?.heading}
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            color: "#1C3048",
            width: "100%",
            fontWeight: "500",
          }}
          className="max-lg:text-center"
        >
          {props?.text}
        </Typography>

        <Link href={props?.navigate}>
          <Button
            style={{
              backgroundColor: "white",
              width: "162px",

              textTransform: "unset",
              boxShadow: " 2px 2px 4px rgba(0, 0, 0, 0.15)",
              border: "none",
              padding: "8px 10px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "500",
            }}
            // onClick={() => router.push(props?.navigate)}
          >
            <span className="text_linear">{props?.buttonName}</span>
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "43%",
          alignItems: "center",
          justifyContent: "end",
        }}
        className="hidden lg:flex"
      >
        {props?.image}
      </Box>
    </Box>
  );
}
