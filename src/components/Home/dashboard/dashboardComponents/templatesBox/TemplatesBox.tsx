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

export default function TemplatesBox() {
  const [openModal, setOpenModal] = React.useState(false);
  const [idName, setIdName] = useState<TemplateDataType | any>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state?.auth?.templatesData);

  useEffect(() => {
    api
      .getDashboardData()
      .then((res) => {
        const dashboardData = res as DashboardDataType[];
        if (dashboardData) {
          dispatch(templatesData(dashboardData));
        }
      })
      .catch((err) => consoleLog("err", err));
  }, []);

  return (
    <Box className="px-[20px] max-sm:px-[10px] pb-10">
      {data?.length > 0
        ? data?.map((item: DashboardDataType, index: number) => (
            <Box key={index}>
              <TemplatesBoxes
                item={item}
                setOpenModal={setOpenModal}
                setIdName={setIdName}
                height={isMobile ? 100 : 200}
              />
            </Box>
          ))
        : true && <TemplatesSkelton />}

      <TemplateModal
        open={openModal}
        template={idName}
        setOpen={setOpenModal}
        setId={setIdName}
        currentPathname={router?.asPath}
      />
    </Box>
  );
}
