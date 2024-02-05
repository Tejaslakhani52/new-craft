import api from "@/src/clientApi/api";
import { consoleLog } from "@/src/commonFunction/console";
import TemplateModal from "@/src/components/singleTemplate/TemplateModal";
import { TemplateDataType } from "@/src/interface/commonType";
import { DashboardData, DashboardDataType } from "@/src/interface/dashboard";
import { Box } from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import TemplatesSkelton from "../TemplatesSkelton";
import TemplatesBoxes from "./components/TemplatesBoxes";
import { RootState } from "@/src/redux";
import {
  dashboardPage,
  templatesData,
} from "@/src/redux/reducer/AuthDataReducer";
import Link from "next/link";

export default function TemplatesBox() {
  const [openModal, setOpenModal] = React.useState(false);
  const [idName, setIdName] = useState<TemplateDataType | any>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const datas = useSelector((state: RootState) => state?.auth?.templatesData);
  const pages = useSelector((state: RootState) => state?.auth?.dashboardPage);
  console.log("datas: ", pages);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [data, setData] = useState<DashboardData[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(templatesData(data));
  //     setData(data);
  //   }
  // }, [data]);

  useEffect(() => {
    api
      .getDashboardData({ page: page })
      .then((res) => {
        const dashboardData = res as DashboardDataType;
        if (dashboardData?.datas) {
          setData((prevData) => [
            ...(prevData || []),
            ...(Array.isArray(dashboardData?.datas)
              ? dashboardData?.datas
              : []),
          ]);
        }

        // const updatedData = [
        //   ...(datas || []),
        //   ...(Array.isArray(dashboardData?.datas) ? dashboardData?.datas : []),
        // ];

        // dispatch(templatesData(updatedData));

        setIsLastPage(dashboardData?.isLastPage);
        setLoading(false);
      })
      .catch((err) => consoleLog("err", err));
  }, [pages]);

  const debouncedHandleScroll = () => {
    // const scrollOffset = 200;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      if (!isLastPage) {
        setPage((prev) => prev + 1);

        // const pagesVal = pages + 1;

        // dispatch(dashboardPage(pagesVal));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [isLastPage, debouncedHandleScroll]);

  return (
    <Box className="px-[20px] max-sm:px-[10px] pb-10">
      {data && data?.length > 0 ? (
        data?.map((item: DashboardData, index: number) => (
          <Box key={index}>
            <TemplatesBoxes
              item={item}
              setOpenModal={setOpenModal}
              setIdName={setIdName}
              height={isMobile ? 100 : 200}
            />
          </Box>
        ))
      ) : (
        <TemplatesSkelton />
      )}

      <TemplateModal
        open={openModal}
        template={idName}
        setOpen={setOpenModal}
        setId={setIdName}
        currentPathname={router?.asPath}
      />

      <div
        style={{
          display: data && data?.length > 0 ? "flex" : "none",
          justifyContent: "center",
          padding: "40px 0",
        }}
      >
        {!isLastPage && (
          <Box className="text_linear font-[700 text-[20px]">Loading....</Box>
        )}
      </div>
    </Box>
  );
}
