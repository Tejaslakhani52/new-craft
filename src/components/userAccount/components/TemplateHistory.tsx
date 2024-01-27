import { dateFormate } from "@/src/commonFunction/dateFormate";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function TemplateHistory({ userSubscription }: any) {
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
              {userSubscription?.purchaseHistory === "No History exist." ? (
                <div className=" w-full p-[24px] text-[16px]">
                  No History Exist.
                </div>
              ) : (
                userSubscription?.purchaseHistory &&
                userSubscription?.purchaseHistory?.map(
                  (item: any, index: any) => (
                    <tr key={index} className="bg-[#F4F7FE] border-b ">
                      <td className="px-4 py-4  whitespace-nowrap">
                        <div className="w-[100px] border h-[100px] flex justify-center items-center p-[5px] bg-white rounded-[5px]">
                          <img
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
                        <Link
                          href={`https://editor.craftyartapp.com/${item?.product_id}`}
                          target="_blank"
                        >
                          <button className="bg_linear px-[30px] py-[5px] text-white rounded-[4px]">
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
}
