import Icons from "@/src/assets";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const data = [
  {
    name: "home",
    icon: <Icons.homeIcon svgProps={{ width: 25, height: 25, color: "" }} />,
    activeIcon: (
      <Icons.homeColorIcon svgProps={{ width: 25, height: 25, color: "" }} />
    ),
    path: "/",
  },
  {
    name: "folder",
    icon: <Icons.folderIcon svgProps={{ width: 25, height: 25, color: "" }} />,
    activeIcon: (
      <Icons.folderActiveIcon svgProps={{ width: 25, height: 25, color: "" }} />
    ),
    path: "/draft",
  },

  {
    name: "plus",
    icon: (
      <Icons.linearPlusIcon svgProps={{ width: 50, height: 50, color: "" }} />
    ),
    activeIcon: (
      <Icons.linearPlusIcon svgProps={{ width: 50, height: 50, color: "" }} />
    ),
    path: "https://play.google.com/store/apps/details?id=com.crafty.art",
  },

  {
    name: "templates",
    icon: (
      <Icons.dashboardIcon svgProps={{ width: 25, height: 25, color: "" }} />
    ),
    activeIcon: (
      <Icons.dashboardActiveIcon
        svgProps={{ width: 25, height: 25, color: "" }}
      />
    ),
    path: "/templates",
  },
  {
    name: "premium",
    icon: <Icons.premiumIcon svgProps={{ width: 25, height: 25, color: "" }} />,
    activeIcon: (
      <Icons.premiumActiveIcon
        svgProps={{ width: 25, height: 25, color: "" }}
      />
    ),
    path: "/plans",
  },
];

export default function MobileBottomBar() {
  const router = useRouter();
  const sideBarRedux = useSelector((state: any) => state.actions.openSidebar);

  return (
    <Box
      className="fixed bottom-0 right-0 left-0 sm:hidden bg-white h-[66px] z-[100]"
      sx={{ display: sideBarRedux ? "none" : "block" }}
    >
      <Box className="flex items-center h-full justify-around">
        {data?.map((item: any, index: any) => (
          <Box key={index}>
            <button
              style={{
                marginTop: item?.name === "plus" ? "-61px" : "0",
              }}
              onClick={() => router.push(item?.path)}
            >
              {router.pathname === item.path ? item.activeIcon : item.icon}
            </button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
