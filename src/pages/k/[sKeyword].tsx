import Icons from "@/src/assets";
import api from "@/src/clientApi/api";
import { calculateHeight } from "@/src/commonFunction/calculateHeight";
import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import ImageBox from "@/src/components/common/ImageBox";
import { DataType } from "@/src/interface/searchTemplateType";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import StackGrid from "react-stack-grid";

const Breadcrumb = dynamic(() => import("@/src/components/common/Breadcrumb"));
const TemplateModal = dynamic(
  () => import("@/src/components/singleTemplate/TemplateModal")
);

export async function getServerSideProps(context: any) {
  try {
    const { params } = context;

    const accessKey = process.env.NEXT_PUBLIC_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2;

    const response = await axios.post(
      `${apiUrl}/templates/api/getKeyTemplates/`,
      {
        key: `${accessKey}`,
        key_name: params?.sKeyword,
        page: 1,
      }
    );
    let serverData = response?.data;
    let updatedLines;

    const formattedText = response?.data?.long_desc;
    const lines = formattedText?.split(/\n/g);

    const keyword = "wedding invitation template";
    if (lines && keyword) {
      const link = `
        <a href="https://www.craftyartapp.com/k/wedding-invitation-template" target="_blank" rel="noopener" style="text-decoration: none;  " class="text_linear">
          Wedding Invitation Template
        </a>
      `;
      const keywordRegExp = new RegExp(keyword, "gi");
      updatedLines = lines.map((line: any) =>
        line.replace(keywordRegExp, link)
      );
    }

    return {
      props: {
        serverData,
        updatedLines,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function sKeyword({ serverData, updatedLines }: any) {
  const router = useRouter();
  const searchName: any = router?.query?.sKeyword;
  const formattedSearchName = searchName?.replace(/\s+/g, "-").toLowerCase();
  const screenWidth = useScreenWidth();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<any>(true);
  const [isLastPage, setIsLastPage] = useState<any>();
  const [idName, setIdName] = useState<any>("");

  const tempIdValue = useSelector((state: any) => state.actions.tempId);

  useEffect(() => {
    setLoadMore(true);
    if (formattedSearchName) {
      api
        .getKeywordData({
          key_name: formattedSearchName,
          page: page,
        })
        .then((response) => {
          setLoadMore(false);
          setIsLastPage(response?.current_page >= response?.total_page);

          if (response?.datas) {
            setData((prevData: any) => [
              ...(prevData || []),
              ...response?.datas,
            ]);
          }
        })
        .catch((err: any) => {});
    }
  }, [formattedSearchName, page]);

  useEffect(() => {
    const element: any = document.getElementById(tempIdValue);
    element?.scrollIntoView();
  }, [data]);

  const multiSizeFixSize = React.useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 7.47;
      case screenWidth > 1200:
        return 6.72;
      case screenWidth > 1023:
        return 5.72;
      case screenWidth > 700:
        return 3.3;

      case screenWidth > 550:
        return 3.3;

      case screenWidth > 250:
        return 2.22;
      default:
        return 2.2;
    }
  }, [screenWidth]);

  return (
    <>
      {serverData?.datas && (
        <>
          <Box className="bg-[#F4F7FE] px-[10px] sm:px-[16px]">
            <Head>
              <title>{serverData?.meta_title}</title>
              <meta name="description" content={serverData?.meta_desc} />
            </Head>
            <Box className="pt-[15px]">
              <Breadcrumb
                data={[
                  { name: "Home", path: "/" },
                  { name: formattedSearchName, current: true },
                ]}
              />
            </Box>

            <Box
              sx={{
                background:
                  "url(https://assets.craftyart.in/w_assets/images/sKeywordBanner.png)",
                margin: "10px auto",
                width: "100%",
                overflow: "hidden",
                backgroundSize: "cover",
                py: "50px",
              }}
              className="lg:pl-[80px]  max-lg:px-[20px] h-auto max-lg:py-[50px] rounded-[8px] max-sm:py-[20px ]"
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  width: "100%",
                  fontWeight: "500",
                  lineHeight: "40px",
                }}
                className="text-center text-[25px] sm:text-[35px] "
                variant="h1"
              >
                {serverData?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#ffff",
                  width: "100%",
                  marginBottom: "10px",
                }}
                className="text-center max-sm:text-[15px] py-[10px] w-[95%] sm:w-[70%] mx-auto my-[10px]"
              >
                {serverData?.short_desc}
              </Typography>
            </Box>

            <Box sx={{ minHeight: `700px` }}>
              <StackGrid
                columnWidth={screenWidth / multiSizeFixSize}
                duration={0}
              >
                {data?.map((templates: any, index: number) => (
                  <ImageBox
                    key={index}
                    templates={templates}
                    screenWidth={screenWidth}
                    multiSizeFixSize={multiSizeFixSize}
                    setIdName={setIdName}
                    setOpenModal={setOpenModal}
                  />
                ))}
              </StackGrid>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "40px 0 70px",
                }}
              >
                {loadMore ? (
                  <Box className="text_linear font-[700 text-[20px]">
                    Loading....
                  </Box>
                ) : (
                  <Button
                    className="bg_linear px-[80px] py-[10px] rounded-[7px] text-[15px] text-white font-semibold"
                    sx={{ display: isLastPage ? "none" : "block" }}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    LOAD MORE
                  </Button>
                )}
              </div>
            </Box>

            <Box
              sx={{
                width: { xs: "98%", lg: "98%" },
                margin: "auto",
                padding: "20px 0",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "20px", lg: "30px" },

                  fontWeight: "600",
                  lineHeight: "30px",
                  textAlign: "center",
                  marginBottom: "30px",
                }}
                variant="h2"
              >
                {serverData?.h2_tag}
              </Typography>

              <div>
                {updatedLines.map((line: any, index: number) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="mb-3"
                  />
                ))}
              </div>
            </Box>
          </Box>
        </>
      )}

      <TemplateModal
        open={openModal}
        id={idName}
        setOpen={setOpenModal}
        setId={setIdName}
      />
    </>
  );
}
