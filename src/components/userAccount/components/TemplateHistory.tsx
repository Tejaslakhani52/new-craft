import api from "@/src/clientApi/api";
import { consoleLog } from "@/src/commonFunction/console";
import { dateFormate } from "@/src/commonFunction/dateFormate";
import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import { Product, PurchaseTemplate } from "@/src/interface/purchaseTemplates";
import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TemplateHistory() {
  const screenWidth = useScreenWidth();
  const [loadMoreTemplate, setLoadMoreTemplate] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [templateData, setTemplateData] = useState<Product[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    setLoadMoreTemplate(true);
    api
      .getUserTemplate({ page: page })
      .then((templateData: PurchaseTemplate) => {
        setLoadMoreTemplate(false);
        setIsLastPage(!templateData?.hasNextPage);

        if (templateData?.data) {
          setTemplateData((prevData: Product[]) => [
            ...(prevData || []),
            ...(templateData?.data || []),
          ]);
        }
      })
      .catch((error) => {
        consoleLog("getUserTemplate", error);
        setLoadMoreTemplate(false);
      });
  }, [page]);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Box>
        <Typography variant="h1" className="font-semibold text-[24px] mb-8">
          Template Purchase History
        </Typography>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className=" text-gray-700 bg-gray-50  ">
              <tr className="bg-[#F4F7FE] border-b ">
                <th className="px-4 py-4 whitespace-nowrap">Template</th>
                <th className="px-4 py-4 whitespace-nowrap">Name</th>
                <th className="px-4 py-4 whitespace-nowrap">Transaction Id</th>
                <th className="px-4 py-4 whitespace-nowrap">Date</th>
                <th className="px-4 py-4 whitespace-nowrap">Amount</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loadMoreTemplate &&
              (!templateData?.length || templateData.length === 0) ? (
                <div className=" w-full p-[24px] text-[16px]">
                  No History Exist.
                </div>
              ) : (
                templateData &&
                templateData?.map((item: Product, index: number) => (
                  <tr key={index} className="bg-[#F4F7FE] border-b ">
                    <td className="px-4 py-4  whitespace-nowrap">
                      <div className="w-[100px] border h-[100px] flex justify-center items-center p-[5px] bg-white rounded-[5px]">
                        <img
                          crossOrigin="anonymous"
                          src={`/api/image/compress?url=${encodeURIComponent(
                            item?.product_image
                          )}`}
                          alt=""
                          className="max-w-full max-h-full w-auto h-auto"
                        />
                      </div>
                    </td>
                    <td className="px-4  max-w-[150px] py-4">
                      {item?.product_name}
                    </td>
                    <td className="px-4 py-4  whitespace-nowrap">
                      {item?.transaction_id}
                    </td>
                    <td className="px-4 py-4  whitespace-nowrap">
                      {dateFormate(item?.purchase_date)}
                    </td>
                    <td className="px-4 py-4  whitespace-nowrap">
                      {item?.amount}
                    </td>
                    <td className="px-4 py-4  whitespace-nowrap">
                      {item?.status === "Active" ? (
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "green", fontSize: "20px" }}
                        />
                      ) : (
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "red", fontSize: "20px" }}
                        ></i>
                      )}
                    </td>

                    <td className="px-4 py-4  whitespace-nowrap">
                      {screenWidth < 800 ? (
                        <Link
                          href={`https://play.google.com/store/apps/details?id=com.crafty.art`}
                          target="_blank"
                        >
                          <button className="bg_linear px-[30px] py-[5px] text-white rounded-[4px]">
                            Edit
                          </button>
                        </Link>
                      ) : (
                        <Link
                          href={`https://editor.craftyartapp.com/${item?.product_id}`}
                          target="_blank"
                        >
                          <button className="bg_linear px-[30px] py-[5px] text-white rounded-[4px]">
                            Edit
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          {loadMoreTemplate ? (
            <Box className="text_linear font-[700 text-[20px]">Loading....</Box>
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
    </>
  );
}
