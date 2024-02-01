import Icons from "@/src/assets";
import { openSidebar } from "@/src/redux/reducer/actionDataReducer";
import { Box, Button, Divider, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditorTools,
  Product,
  Templates,
  handleClickWhatsapp,
} from "../header/headerComponents/Menu";
import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import { authCookiesGet } from "@/src/redux/action/AuthToken";
import { RootState } from "@/src/redux";

const option = [
  {
    name: "Draft",
    icons: <Icons.draftIcon svgProps={{ width: 20 }} />,
    activeIcon: <Icons.draftActiveIcon svgProps={{ width: 20 }} />,
    path: "/draft",
  },
  {
    name: "Trash",
    icons: <Icons.trashIcon svgProps={{ width: 20 }} />,
    activeIcon: <Icons.trashActiveIcon svgProps={{ width: 20 }} />,
    path: "/trash",
  },
];

interface AllNameType {
  name: string;
  path: string;
}

interface SubNameType {
  heading: string;
  allName: AllNameType[];
}

interface DataProps {
  name: string;
  subName: SubNameType[];
}

interface PropsType {
  open: boolean;
  data: DataProps;
  setOpens: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InnerButton = ({ open, data, setOpens }: PropsType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const screenWidth = useScreenWidth();
  return (
    <Box
      className={`fixed  
     bottom-0 top-[70px] max-lg:top-0 bg-white w-[250px] overflow-auto z-[1000000] max-lg:w-[300px] max-sm:w-[80%]
      border-[1.5px] border-r-[#D5D8E3] py-[20px]  ${
        open
          ? "left-0"
          : "left-[-268px] max-lg:left-[-350px] max-sm:left-[-80%]"
      } `}
      sx={{ transition: "0.2s all" }}
    >
      <Box className="">
        <Box className="px-[20px] flex items-center gap-4 pb-3 ">
          <Button
            onClick={() => {
              setOpens(false);
            }}
            className="min-w-[auto]"
          >
            <Icons.leftArrowIcon svgProps={{ width: 8 }} />
          </Button>

          <span className="text-black text-[20px] font-semibold">
            {data?.name}
          </span>
        </Box>
        <Divider />

        {data?.subName?.map((data: SubNameType, index: number) => (
          <div key={index}>
            <Box className="flex flex-col p-[20px]">
              <Typography
                className={`text-black font-semibold px-4 ${
                  data?.heading && " pb-3"
                }`}
              >
                {data?.heading}
              </Typography>
              {data?.allName?.map((item: AllNameType, index: number) => (
                <div key={index}>
                  <MenuItem
                    onClick={() => {
                      router.push(item.path);
                      if (screenWidth < 1020) {
                        dispatch(openSidebar(false));
                      }
                    }}
                    sx={{
                      fontSize: "14px",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: "#EDF0F9",
                      },
                      color:
                        router.pathname === item.path ? "#2EC6B8" : "#1C3048",
                    }}
                  >
                    {item?.name}
                  </MenuItem>
                </div>
              ))}
            </Box>
            <Divider />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default function Sidebar(
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | any
) {
  const router = useRouter();
  const dispatch = useDispatch();
  const sideBarRedux = useSelector(
    (state: RootState) => state.actions.openSidebar
  );
  const [screenHeight, setScreenHeight] = useState(0);
  const screenWidth = useScreenWidth();
  const [token, setToken] = React.useState<string | null>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(authCookiesGet());
    }
  }, []);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateScreenHeight);
    updateScreenHeight();
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);

  useEffect(() => {
    const htmlStyleElement = document.getElementById("html_style");

    if (htmlStyleElement && screenWidth < 1020) {
      if (sideBarRedux) {
        htmlStyleElement.style.overflow = "hidden";
      } else {
        htmlStyleElement.style.overflow = "auto";
      }
    }
  }, [sideBarRedux]);

  interface MenuItem {
    name: string;
    icons: React.ReactElement;
    activeIcon: React.ReactElement;
    path: string;
  }

  const sidebarMenu: MenuItem[] = [
    {
      name: "Home",
      icons: <Icons.homeIcons svgProps={{ width: 20 }} />,
      activeIcon: <Icons.homeActiveIcon svgProps={{ width: 20 }} />,
      path: "/",
    },
    ...(token
      ? [
          {
            name: "My Account",
            icons: <Icons.profileIcon svgProps={{ width: 20 }} />,
            activeIcon: <Icons.profileActiveIcon svgProps={{ width: 20 }} />,
            path: "/your-account",
          },
          {
            name: "Upload",
            icons: <Icons.upload2Icon svgProps={{ width: 20 }} />,
            activeIcon: <Icons.uploadActiveIcon svgProps={{ width: 20 }} />,
            path: "/upload",
          },
        ]
      : []),

    {
      name: "Templates",
      icons: <Icons.templatesIcon svgProps={{ width: 20 }} />,
      activeIcon: <Icons.templatesActiveIcon svgProps={{ width: 20 }} />,
      path: "/templates",
    },

    {
      name: "Custom Order",
      icons: <Icons.customOrderIcon svgProps={{ width: 20 }} />,
      activeIcon: <Icons.customOrderActiveIcon svgProps={{ width: 20 }} />,
      path: "/customOrder",
    },
  ];

  const SideBarMenuButton = (props: { data: DataProps }) => {
    const [open, setOpens] = useState<boolean>(false);
    return (
      <Box>
        <Button
          className="flex gap-5 px-[20px] justify-between  w-full normal-case	text-black mb-2 relative"
          onClick={() => setOpens(!open)}
        >
          <span className="text-black text-[15px]">{props.data?.name}</span>

          <Icons.rightArrowIcon svgProps={{ width: 7 }} />
        </Button>
        <div>
          <InnerButton
            open={open}
            data={props.data}
            setOpens={setOpens}
            setOpen={setOpen}
          />
        </div>
      </Box>
    );
  };
  return (
    <Box>
      <Box
        className={`fixed  
       bottom-0 top-[70px] max-lg:top-0  bg-[#4f4f4f6b] w-[100%] py-[20px] block lg:hidden `}
        sx={{
          left: sideBarRedux ? "0" : "-100%",
          // transition: "0.1s all",
          zIndex: "500",
        }}
        onClick={() => dispatch(openSidebar(false))}
      ></Box>
      <Box
        className={`fixed  
       bottom-0 top-[70px] max-lg:top-0 bg-white w-[250px] max-lg:w-[300px] max-sm:w-[80%]
        py-[20px]  ${
          sideBarRedux
            ? "left-0"
            : "left-[-268px] max-lg:left-[-350px] max-sm:left-[-80%]"
        } `}
        sx={{
          zIndex: "500",
          borderRight: "1px solid #D5D8E3",
        }}
      >
        <Box sx={{ height: `${screenHeight - 150}px`, overflow: "auto" }}>
          <Box className="block lg:hidden pb-2">
            <SideBarMenuButton data={Product} />
            <SideBarMenuButton data={EditorTools} />
            <SideBarMenuButton data={Templates} />
            <Button
              className="flex gap-5 px-[20px] justify-between  w-full normal-case	text-black mb-2 relative"
              onClick={handleClickWhatsapp}
            >
              <span className="text-black text-[15px]">Custom order</span>
            </Button>
            <Box onClick={() => dispatch(openSidebar(false))}>
              <Link
                href={"/plans"}
                className="text-black font-medium py-[7px] text-[15px] w-full flex gap-5 px-[20px] justify-between  w-full normal-case	text-black mb-2 relative"
              >
                Pricing
                <span className="ml-[8px] w-[20px]">
                  <Icons.pricingIcon svgProps={{ width: 20 }} />
                </span>
              </Link>
            </Box>
          </Box>
          <Divider className="hidden max-lg:block" />
          <Box className="max-lg:py-5 px-[10px]">
            {sidebarMenu?.map((item: MenuItem, index: number) => (
              <Box
                key={index}
                className={`${
                  item.name === "Custom Order" && "py-5 mt-3 mb-3"
                }`}
                sx={{
                  borderTop:
                    item.name === "Custom Order"
                      ? "1px dashed #1c304840"
                      : "none",
                  borderBottom:
                    item.name === "Custom Order"
                      ? "1px dashed  #1c304840"
                      : "none",
                }}
              >
                {item?.name === "Custom Order" ? (
                  <Box
                    className={`flex cursor-pointer py-3 px-3 w-full hover:bg-[#F4F7FE] ${
                      router.pathname === item.path && " bg-[#F4F7FE]"
                    }    rounded-[4px]`}
                    onClick={handleClickWhatsapp}
                  >
                    {/* <Box className="w-[3px] bg-[#2EC6B8] h-5px"></Box> */}
                    <Box className="flex gap-5  w-full">
                      <Box className="w-[20px]">
                        {router.pathname === item.path
                          ? item.activeIcon
                          : item.icons}
                      </Box>
                      <Typography
                        className={`text-[15px] ${
                          router.pathname === item.path
                            ? " active_text_linear "
                            : "text-black opacity-60"
                        }`}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex cursor-pointer py-3 px-3 w-full hover:bg-[#F4F7FE] ${
                      router.pathname === item.path && " bg-[#F4F7FE]"
                    }    rounded-[4px]`}
                    onClick={() => {
                      if (screenWidth < 1020) {
                        dispatch(openSidebar(false));
                      }
                    }}
                  >
                    {/* <Box className="w-[3px] bg-[#2EC6B8] h-5px"></Box> */}
                    <Box className="flex gap-5  w-full">
                      <Box className="w-[20px]">
                        {router.pathname === item.path
                          ? item.activeIcon
                          : item.icons}
                      </Box>
                      <Typography
                        className={`text-[15px] ${
                          router.pathname === item.path
                            ? " active_text_linear "
                            : "text-black opacity-60"
                        }`}
                      >
                        {item.name}
                      </Typography>
                      {item.name === "Templates" && (
                        <span className="w-[6px] ml-auto">
                          <Icons.rightArrowIcon svgProps={{ width: 6 }} />
                        </span>
                      )}
                    </Box>
                  </Link>
                )}
              </Box>
            ))}
            {token && (
              <>
                <Typography className="px-3 text-black text-[13px] pb-1">
                  OPTIONS
                </Typography>
                {option?.map((item, index: number) => (
                  <Box
                    key={index}
                    className={`${
                      item.name === "Refer and earn" && "py-5 mt-3"
                    }`}
                    sx={{
                      borderTop:
                        item.name === "Refer and earn"
                          ? "1px dashed #1c30486b"
                          : "none",
                      borderBottom:
                        item.name === "Refer and earn"
                          ? "1px dashed  #1c30486b"
                          : "none",
                    }}
                  >
                    <Link
                      href={item.path}
                      className={`flex cursor-pointer py-3 px-3 w-full hover:bg-[#F4F7FE] ${
                        router.pathname === item.path && " bg-[#F4F7FE]"
                      }    rounded-[4px]`}
                      onClick={() => {
                        if (screenWidth < 1020) {
                          dispatch(openSidebar(false));
                        }
                      }}
                    >
                      <Box className="flex gap-5">
                        <Box className="w-[20px]">
                          {router.pathname === item.path
                            ? item.activeIcon
                            : item.icons}
                        </Box>
                        <Typography
                          className={`text-[15px] ${
                            router.pathname === item.path
                              ? " active_text_linear"
                              : "text-black opacity-60"
                          }`}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>

        <Box className="h-[150px] flex lg:hidden  flex-col items-center   gap-4 w-full px-[20px] justify-end  pb-10">
          <Button
            className="bg_linear text-white gap-2 rounded-[10px] font-bold px-5 py-2 w-full "
            onClick={() => {
              dispatch(openSidebar(false));
              router.push("/plans");
            }}
          >
            <Icons.pricingIcon svgProps={{ width: 20 }} />
            Upgrade to PRO
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
