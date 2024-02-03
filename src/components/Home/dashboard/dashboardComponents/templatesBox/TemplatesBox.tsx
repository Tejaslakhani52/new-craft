import api from "@/src/clientApi/api";
import { consoleLog } from "@/src/commonFunction/console";
import TemplateModal from "@/src/components/singleTemplate/TemplateModal";
import { DashboardDataType } from "@/src/interface/dashboard";
import { RootState } from "@/src/redux";
import { templatesData } from "@/src/redux/reducer/AuthDataReducer";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import TemplatesSkelton from "../TemplatesSkelton";
import TemplatesBoxes from "./components/TemplatesBoxes";
import { TemplateDataType } from "@/src/interface/commonType";
import { debounce } from "lodash";
import axios from "axios";

export default function TemplatesBox() {
  const [openModal, setOpenModal] = React.useState(false);
  const [idName, setIdName] = useState<TemplateDataType | any>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // const data = useSelector((state: RootState) => state?.auth?.templatesData);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [data, setData] = useState<DashboardDataType[]>();

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2;
  const apiKey = process.env.NEXT_PUBLIC_KEY;

  useEffect(() => {
    axios
      .post(`${apiUrl}/templates/api/getDashboard`, {
        key: `${apiKey}`,
        page: page,
      })
      .then((res: any) => {
        console.log("res: ", res);
        // const dashboardData = res.data.datas;
        // console.log("dashboardData: ", dashboardData);
        // if (dashboardData) {
        //   dispatch(templatesData(dashboardData));
        // }

        if (res?.data?.datas) {
          setData((prevData) => [
            ...(prevData || []),
            ...(Array.isArray(res.data.datas) ? res.data.datas : []),
          ]);
        }

        setIsLastPage(res?.data?.isLastPage);
        setLoading(false);
      });
    // api
    //   .getDashboardData({ page: page })
    //   .then((res) => {
    //     const dashboardData = res as DashboardDataType[];
    //     console.log("dashboardData: ", dashboardData);
    //     if (dashboardData) {
    //       dispatch(templatesData(dashboardData));
    //     }

    //     setData((prevData) => [
    //       ...(prevData || []),
    //       ...(Array.isArray(dashboardData) ? dashboardData : []),
    //     ]);
    //   })
    //   .catch((err) => consoleLog("err", err));
  }, [page]);

  const debouncedHandleScroll = debounce(() => {
    const scrollOffset = 200;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - scrollOffset
    ) {
      if (!isLastPage) {
        setPage((prev) => prev + 1);
      }
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [isLastPage, debouncedHandleScroll]);

  return (
    <Box className="px-[20px] max-sm:px-[10px] pb-10">
      {data && data?.length > 0 ? (
        data?.map((item: DashboardDataType, index: number) => (
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
