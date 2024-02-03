import Icons from "@/src/assets";
import api from "@/src/clientApi/api";
import { calculateHeight } from "@/src/commonFunction/calculateHeight";
import { consoleLog } from "@/src/commonFunction/console";
import { isPurchased } from "@/src/commonFunction/isPurchased";
import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import TemplateModal from "@/src/components/singleTemplate/TemplateModal";
import { authCookiesGet, userPremiumGet } from "@/src/redux/action/AuthToken";
import {
  modalClosePath,
  openLogin,
  tempId,
} from "@/src/redux/reducer/actionDataReducer";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import StackGrid from "react-stack-grid";
import { isMobile, isTablet } from "react-device-detect";
import { SingleTempType } from "@/src/interface/getSingleTempType";
import { TemplateDataType } from "@/src/interface/commonType";
import { RootState } from "@/src/redux";
import { GetServerSideProps } from "next";

const CustomHead = dynamic(() => import("@/src/components/common/CustomHead"));
const ShowPremiumDialog = dynamic(
  () => import("@/src/components/templatePayment/ShowPremiumDialog")
);

interface PropType {
  image: string | any;
  text: string;
}

export const IconsText = ({ image, text }: PropType) => {
  return (
    <Typography className="flex text-[#1C3048] text-[14px] gap-3 items-center py-2">
      {image}
      {text}
    </Typography>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2;
    const accessKey = process.env.NEXT_PUBLIC_KEY;

    const response = await axios.post(
      `${apiUrl}/templates/api/V4/getPosterPage`,
      {
        key: `${accessKey}`,
        id_name: params?.templateId,
        fromFabric: "1",
      },
      { withCredentials: false }
    );

    const templateData = response?.data;

    return {
      props: {
        templateData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function index(props: { templateData: SingleTempType }) {
  const containerId = `slider`;
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = React.useState<string | null>(null);
  const [anotherData, setAnotherData] = React.useState<TemplateDataType[]>([]);
  const screenWidth = useScreenWidth();
  const [idName, setIdName] = React.useState<TemplateDataType | any>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [showPrevButton, setShowPrevButton] = React.useState(true);
  const [showNextButton, setShowNextButton] = React.useState(true);
  const [showImage, setShowImage] = React.useState<string>("");
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [showPremiumBox, setShowPremiumBox] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showPreviewButton, setShowPreviewButton] = React.useState<string>("");

  const purchaseItems = useSelector(
    (state: RootState) => state.auth.setPurchaseItems
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(authCookiesGet());
    }
  }, []);

  React.useEffect(() => {
    setAnotherData([]);
    api
      .searchTemplate({
        keywords:
          props?.templateData?.tags?.[0] === "Poster"
            ? props?.templateData?.tags?.[1]
            : props?.templateData?.tags?.[0],
        page: 1,
      })
      .then((res) => {
        setAnotherData(res?.datas);
        setLoading(false);
      })
      .catch((err) => {
        consoleLog("searchTemplate: ", err);
      });
  }, [props?.templateData]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  React.useEffect(() => {
    setShowImage(props?.templateData?.thumbArray?.[0]);
  }, [props?.templateData]);

  // var templateIds: string;
  // if (typeof window !== "undefined" && !openModal) {
  //   const pathSegments = window.location.pathname.split("/");
  //   templateIds = pathSegments[pathSegments?.length - 1];
  // }

  const multiSizeFixSize = React.useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 7.77;
      case screenWidth > 1200:
        return 6.49;
      case screenWidth > 1023:
        return 5.49;
      case screenWidth > 700:
        return 4.49;
      case screenWidth > 550:
        return 3.35;
      default:
        return 2.22;
    }
  }, [screenWidth]);

  const handleScroll = (e: Event) => {
    const container = e.target as HTMLElement;
    setShowPrevButton(container.scrollLeft > 0);
    setShowNextButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  React.useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll({ target: container } as unknown as Event);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerId, handleScroll]);

  const handleNextClick = () => {
    const container = document.getElementById(containerId) as HTMLElement;
    if (container) {
      container.scrollBy({
        left: container.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevClick = () => {
    const container = document.getElementById(containerId) as HTMLElement;
    if (container) {
      container.scrollBy({
        left: -container.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box className="px-[40px] max-sm:px-[10px] py-2">
      <CustomHead
        image={showImage}
        heading={props?.templateData?.template_name}
        text={`Design with ${props?.templateData?.template_name}: Ignite Your Imagination, Create Unique Art, and Inspire Awe. Start Design Crafting Today with Crafty Art!`}
      />

      <Box>
        <Box className="flex  my-[20px] gap-[50px] max-sm:gap-[10px] max-2md:flex-col max-2md:h-auto">
          <Box className="w-[66%]  max-sm:w-full mx-auto">
            <Box className="rounded-[4px] h-[450px]  bg-[#F4F7FE] flex justify-center items-center">
              {imageLoaded && showImage ? (
                <img
                  src={showImage}
                  alt={props?.templateData?.template_name}
                  className=" h-[430px] w-auto max-sm:w-auto  max-sm:h-auto max-sm:max-h-[400px] rounded-[4px]"
                  style={{ border: "1px solid #80808059" }}
                />
              ) : (
                <div>Loading...</div>
              )}

              <img
                onLoad={handleImageLoad}
                src={showImage}
                alt={props?.templateData?.template_name}
                style={{ display: "none" }}
              />
            </Box>

            <Box
              className="relative"
              sx={{
                display:
                  props?.templateData?.thumbArray?.length > 1
                    ? "block"
                    : "none",
              }}
            >
              <Box
                className="flex items-center overflow-auto py-[20px] scroll_none  "
                id={containerId}
                sx={{
                  justifyContent: showNextButton ? "start" : "center",
                }}
              >
                {showPrevButton && (
                  <Box>
                    <button
                      className="pre_button z-[1] left-[0] md:left-[-20px]  flex"
                      style={{ top: "52%" }}
                      onClick={handlePrevClick}
                    >
                      <Icons.leftArrowIcon svgProps={{ width: 8 }} />
                    </button>
                  </Box>
                )}
                {props?.templateData?.thumbArray?.map(
                  (image: string, index: number) => (
                    <Box
                      key={index}
                      className="cursor-pointer rounded-[4px] mx-[5px]"
                      sx={{
                        border:
                          showImage === image
                            ? "2px solid #2ec6b8"
                            : "2px solid #ffff",
                      }}
                      onClick={() => setShowImage(image)}
                    >
                      <Box className="w-[80px]">
                        <img
                          src={`/api/image/compress?url=${encodeURIComponent(
                            image
                          )}`}
                          alt={props?.templateData?.template_name}
                          className="h-auto rounded-[4px]"
                        />
                      </Box>
                    </Box>
                  )
                )}
                {showNextButton && (
                  <Box>
                    <button
                      className="next_button right-[0] md:right-[-20px] flex  "
                      style={{ top: "52%" }}
                      onClick={handleNextClick}
                    >
                      <Icons.rightArrowIcon svgProps={{ width: 8 }} />
                    </button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Box className="w-[33%] max-2md:w-full">
            <h1 className="text-[#1C3048] text-[24px] max-sm:text-[20px] font-[500] mb-3">
              {props?.templateData?.template_name}
            </h1>

            <Typography className="text-[#ABB2C7] text-[15px] mb-4">
              {props?.templateData?.category_size}
            </Typography>

            <Box>
              <Box>
                <button
                  onClick={() => {
                    if (isMobile || isTablet) {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.crafty.art"
                      );
                      return;
                    }
                    if (!token) {
                      dispatch(openLogin(true));
                      return;
                    }
                    if (
                      props?.templateData?.is_premium &&
                      !userPremiumGet() &&
                      !isPurchased(purchaseItems, {
                        id: props?.templateData?.string_id,
                        type: 0,
                      })
                    ) {
                      setShowPremiumBox(true);
                    } else
                      window.open(
                        `https://editor.craftyartapp.com/${props?.templateData?.id_name}`
                      );
                  }}
                  className="text-white w-full py-[10px] rounded-[6px] flex items-center cursor-pointer justify-center gap-3"
                  style={{
                    background:
                      "linear-gradient(266deg, #2EC6B8 43.07%, #32E4D4 131.91%)",
                  }}
                >
                  {props?.templateData?.is_premium && (
                    <span className="w-[22px] ml-[8px]">
                      <Icons.pricingIcon svgProps={{ width: 22, height: 21 }} />
                    </span>
                  )}
                  Customize this template
                </button>
              </Box>
            </Box>

            <div className="py-4">
              <IconsText
                image={<Icons.tModalCustomizeIcon svgProps={{ width: 20 }} />}
                text={`Customize ${props?.templateData?.category_name} with our online editing tool`}
              />
              <IconsText
                image={<Icons.tModalSmartphoneIcon svgProps={{ width: 20 }} />}
                text="Edit and Download"
              />
              <IconsText
                image={<Icons.tModalPublishIcon svgProps={{ width: 20 }} />}
                text="Share and publish anywhere"
              />

              {props?.templateData?.is_premium && (
                <IconsText
                  image={<Icons.premiumIcon svgProps={{ width: 20 }} />}
                  text="This Template contains paid elements"
                />
              )}
            </div>
          </Box>
        </Box>

        <h2 className="text-[#1C3048] text-[23px] max-sm:text-[20px] font-[500] pt-4 my-3">
          Templates with the same style and concept
        </h2>
        <Box>
          {loading && (
            <Box
              sx={{
                minHeight: "500px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box className="text_linear font-[700 text-[20px]">
                Loading....
              </Box>
            </Box>
          )}
          <Box>
            <StackGrid
              columnWidth={screenWidth / multiSizeFixSize}
              duration={0}
            >
              {anotherData
                ?.filter(
                  (t) => t.template_id !== props?.templateData?.template_id
                )
                ?.map((templates, index) => (
                  <div
                    className="relative"
                    onMouseEnter={() =>
                      setShowPreviewButton(templates?.id_name)
                    }
                    onMouseLeave={() => setShowPreviewButton("")}
                  >
                    <span
                      className="w-[28px] absolute top-[16px] z-[1] cursor-pointer"
                      style={{
                        right: templates.is_premium ? "47px" : "15px",
                        opacity:
                          showPreviewButton === templates.id_name &&
                          !(isMobile || isTablet)
                            ? "1"
                            : "0",
                        transition: "0.3s all",
                      }}
                      onClick={() => {
                        setIdName(templates);
                        setOpenModal(true);
                      }}
                      onMouseEnter={() =>
                        setShowPreviewButton(templates?.id_name)
                      }
                      onMouseLeave={() => setShowPreviewButton("")}
                    >
                      <Icons.PreviewIcon svgProps={{ width: 27, height: 27 }} />
                    </span>
                    {templates.is_premium && (
                      <span className="w-[28px] absolute right-[13px] top-[16px] z-[1]">
                        <Icons.proIcon svgProps={{ width: 27, height: 27 }} />
                      </span>
                    )}
                    <Link
                      key={index}
                      href={`/templates/p/${templates.id_name}`}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div
                        className=""
                        style={{
                          height: `${calculateHeight(
                            templates?.width,
                            templates?.height,
                            screenWidth / multiSizeFixSize
                          )}px`,
                          width: `${screenWidth / multiSizeFixSize}px`,
                        }}
                        id={`content${index}`}
                        onClick={() => {
                          dispatch(tempId(`content${index}`));
                        }}
                      >
                        <div
                          className="w-full h-full p-[8px] relative"
                          onClick={() => {
                            //   if (!isMobile) {
                            //     setIdName(templates?.id_name);
                            //     setOpenModal(true);
                            //     window.history.replaceState(
                            //       {},
                            //       "",
                            //       `/templates/p/${templates?.id_name}`
                            //     );
                            //   } else {
                            setAnotherData([]);
                            setShowImage("");
                            setImageLoaded(false);
                            router.push(`/templates/p/${templates?.id_name}`);
                            //   }
                          }}
                        >
                          <div
                            style={{
                              border: "1px solid #80808059",
                              borderRadius: "5px",
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            <img
                              src={`/api/image/compress?url=${encodeURIComponent(
                                templates?.template_thumb
                              )}`}
                              alt={templates?.category_name}
                              className={`w-full h-full rounded-[5px] cursor-pointer opacity-0`}
                              style={{
                                transition: "0.5s all",
                              }}
                              onLoad={(e) =>
                                (e.target as HTMLImageElement).classList.remove(
                                  "opacity-0"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </StackGrid>
          </Box>
          <Box className="my-[50px] w-[80%] mx-auto px-[30px]  max-sm:w-full">
            <h2 className="text-[26px] max-sm:text-[23px] text-center text-[#1C3048] font-semibold mb-3">
              {props?.templateData?.h2_tag}
            </h2>

            <Typography className="text-[15px] whitespace-pre-line	text-justify">
              {props?.templateData?.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TemplateModal
        open={openModal}
        template={idName}
        setOpen={setOpenModal}
        setId={setIdName}
      />

      <ShowPremiumDialog
        scroll_none={false}
        open={showPremiumBox}
        setOpen={setShowPremiumBox}
        tempData={{
          id: props?.templateData?.string_id,
          type: 0,
          usdAmount: props?.templateData?.payment?.usdAmount,
          usdVal: props?.templateData?.payment?.usdVal,
          inrAmount: props?.templateData?.payment?.inrAmount,
          inrVal: props?.templateData?.payment?.inrVal,
        }}
      />
    </Box>
  );
}
