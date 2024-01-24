import Icons from "@/src/assets";
import api from "@/src/clientApi/api";
import { calculateHeight } from "@/src/commonFunction/calculateHeight";
import { isPurchased } from "@/src/commonFunction/isPurchased";
import {
  useScreenHeight,
  useScreenWidth,
} from "@/src/commonFunction/screenWidthHeight";
import { SingleTempType } from "@/src/interface/getSingleTempType";
import { DataType, SearchTempType } from "@/src/interface/searchTemplateType";
import { authCookiesGet, userPremiumGet } from "@/src/redux/action/AuthToken";
import { openLogin } from "@/src/redux/reducer/actionDataReducer";
import { Box, Skeleton, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StackGrid from "react-stack-grid";
import ShowPremiumDialog from "../templatePayment/ShowPremiumDialog";

interface PropType {
  image: string | any;
  text: string;
  isLoading: boolean;
}

const IconsText = ({ image, text, isLoading }: PropType) => {
  return isLoading ? (
    <Typography className="flex text-[#1C3048] text-[14px] gap-3 items-center py-2">
      <Skeleton
        variant="rectangular"
        width={"30px"}
        height={`30px`}
        style={{
          borderRadius: `5px`,
        }}
      />

      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={`10px`}
        style={{
          borderRadius: `5px`,
        }}
      />
    </Typography>
  ) : (
    <Typography className="flex text-[#1C3048] text-[14px] gap-3 items-center py-2">
      {image}
      {text}
    </Typography>
  );
};

interface TemplateModalPropType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  currentPathname?: string;
}

export default function TemplateModal({
  open,
  setOpen,
  id,
  setId,
}: TemplateModalPropType) {
  const router = useRouter();
  const containerId = `slider`;
  const dispatch = useDispatch();
  const [token, setToken] = React.useState<any>();
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();
  const [anotherData, setAnotherData] = React.useState<SearchTempType[] | any>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [template, setTemplate] = React.useState<SingleTempType | any>({});
  const [anotherTempLoad, setAnotherTempLoad] = useState<boolean>(true);
  const [showImage, setShowImage] = useState<string>("");
  const [userPremium, setUserPremium] = useState<any>();
  const [showPremiumBox, setShowPremiumBox] = useState<boolean>(false);
  const [showPrevButton, setShowPrevButton] = React.useState(false);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const purchaseItems = useSelector(
    (state: any) => state.auth.setPurchaseItems
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(authCookiesGet());
      setUserPremium(userPremiumGet());
    }
  }, []);

  React.useEffect(() => {
    setShowImage(template?.thumbArray?.[0]);
  }, [template]);

  useEffect(() => {
    setAnotherTempLoad(true);
    setAnotherData([]);
    setIsLoading(true);

    if (id !== "") {
      api
        .getSingleTemplate({
          id_name: id,
        })
        .then((response) => {
          setIsLoading(false);
          setTemplate(response);

          api
            .searchTemplate({
              keywords:
                response?.tags?.[0] === "Poster"
                  ? response?.tags?.[1]
                  : response?.tags?.[0],
              page: 1,
            })
            .then((res) => {
              setAnotherData(res);
              setAnotherTempLoad(false);
            });
        })
        .catch((error) => {});
    }
  }, [id, open]);

  const multiSizeFixSize = React.useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 6.92;
      case screenWidth > 1200:
        return 5.97;
      case screenWidth > 1023:
        return 6.92;
      case screenWidth > 700:
        return 4.92;
      case screenWidth > 600:
      case screenWidth > 550:
        return 2.35;
      default:
        return 2.35;
    }
  }, [screenWidth]);

  useEffect(() => {
    const htmlStyleElement = document.getElementById("html_style");

    if (htmlStyleElement) {
      if (open) {
        htmlStyleElement.style.overflow = "hidden";
      } else {
        htmlStyleElement.style.overflow = "auto";
      }
    }
  }, [open]);

  const scrollContainerRef: any = React.useRef(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isLoading, template]);

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
    <Box
      className="fixed top-0 bottom-0 left-0 right-0 z-[1000]"
      style={{
        backgroundColor: "#1c3048ba",
        visibility: open ? "visible" : "hidden",
      }}
    >
      <Box
        className="overflow-auto"
        ref={scrollContainerRef}
        sx={{
          height: `${screenHeight}px`,
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            background: "white",
            width: { xs: "100%", lg: "80%" },
            mx: "auto",
            borderRadius: "5px",
          }}
          className="my-[20px] max-sm:my-[0]"
        >
          <>
            <button
              className="fixed  z-[100] right-[8%] max-muiLG:right-[3%] max-muiLG:top-[3%] bg-white w-[30px] h-[30px] max-sm:w-[35px] max-sm:top-[2%] max-sm:right-[3%] p-[5px] rounded-[50%] max-muiLG:bg-[aliceblue] "
              onClick={() => {
                setId("");
                setTemplate({});
                setAnotherData([]);
                setOpen(false);
                window.history.replaceState({}, "", `${router.asPath}`);
              }}
            >
              <Icons.modalCloseIcon svgProps={{ width: 20 }} />
            </button>
          </>
          <DialogContent className="px-[40px] max-sm:px-[20px]">
            <Box className="flex my-[20px] gap-[50px] max-2md:flex-col max-2md:h-auto">
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={"66%"}
                    height={`100%`}
                    style={{
                      borderRadius: `5px`,
                    }}
                  />
                </>
              ) : (
                <Box className="w-[66%] mx-auto  max-sm:w-full">
                  <Box className="rounded-[4px] h-[450px]  bg-[#F4F7FE] flex justify-center items-center">
                    <img
                      src={showImage}
                      alt={template?.template_name}
                      className="h-[430px] w-auto max-sm:w-auto max-sm:max-h-[400px] rounded-[4px]"
                      style={{ border: "1px solid #80808059" }}
                    />
                  </Box>

                  <Box
                    className="relative"
                    sx={{
                      display:
                        template?.thumbArray?.length > 1 ? "block" : "none",
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
                      {template?.thumbArray?.map(
                        (image: any, index: number) => (
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
                                src={image}
                                alt={template?.template_name}
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
              )}
              <Box className="w-[33%] max-2md:w-full">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={`20px`}
                    style={{
                      borderRadius: `30px`,
                    }}
                  />
                ) : (
                  <h1 className="text-[#1C3048] text-[24px] font-[500] mb-3">
                    {template?.template_name}
                  </h1>
                )}

                <Typography className="text-[#ABB2C7] text-[15px] mb-4">
                  {isLoading ? (
                    <Skeleton
                      variant="rectangular"
                      width={"35%"}
                      height={`20px`}
                      style={{
                        borderRadius: `30px`,
                        margin: "10px 0",
                      }}
                    />
                  ) : (
                    template?.category_size
                  )}
                </Typography>

                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={`40px`}
                    style={{
                      borderRadius: `4px`,
                      margin: "10px 0",
                    }}
                  />
                ) : !token ? (
                  <Box>
                    <a
                      className="text-white w-full py-[10px] rounded-[6px] flex items-center cursor-pointer justify-center gap-3"
                      style={{
                        background:
                          "linear-gradient(266deg, #2EC6B8 43.07%, #32E4D4 131.91%)",
                      }}
                      onClick={() => {
                        // router.push("/login");
                        dispatch(openLogin(true));
                      }}
                    >
                      {template?.is_premium && (
                        <span className="w-[22px] ml-[8px]">
                          <Icons.pricingIcon
                            svgProps={{ width: 22, height: 21 }}
                          />
                        </span>
                      )}
                      Customize this template
                    </a>
                  </Box>
                ) : (
                  <Box>
                    <button
                      onClick={() => {
                        if (
                          template?.is_premium &&
                          !userPremiumGet() &&
                          !isPurchased(purchaseItems, {
                            id: template?.string_id,
                            type: 0,
                          })
                        ) {
                          setShowPremiumBox(true);
                        } else
                          window.open(
                            `https://editor.craftyartapp.com/${template?.id_name}`
                          );
                      }}
                      className="text-white w-full py-[10px] rounded-[6px] flex items-center cursor-pointer justify-center gap-3"
                      style={{
                        background:
                          "linear-gradient(266deg, #2EC6B8 43.07%, #32E4D4 131.91%)",
                      }}
                    >
                      {template?.is_premium && (
                        <span className="w-[22px] ml-[8px]">
                          <Icons.pricingIcon
                            svgProps={{ width: 22, height: 21 }}
                          />
                        </span>
                      )}
                      Customize this template
                    </button>
                  </Box>
                )}

                <div className="py-4">
                  <IconsText
                    image={
                      <Icons.tModalCustomizeIcon svgProps={{ width: 20 }} />
                    }
                    text={`Customize ${template.category_name} with our online editing tool`}
                    isLoading={isLoading}
                  />
                  <IconsText
                    image={
                      <Icons.tModalSmartphoneIcon svgProps={{ width: 20 }} />
                    }
                    text="Edit and Download"
                    isLoading={isLoading}
                  />
                  <IconsText
                    image={<Icons.tModalPublishIcon svgProps={{ width: 20 }} />}
                    text="Share and publish anywhere"
                    isLoading={isLoading}
                  />

                  {template?.is_premium && (
                    <IconsText
                      image={<Icons.premiumIcon svgProps={{ width: 20 }} />}
                      text="This Template contains paid elements"
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </Box>
            </Box>

            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={"40%"}
                height={`20px`}
                style={{
                  borderRadius: `30px`,
                  margin: "40px 0 30px",
                }}
              />
            ) : (
              <h2 className="text-[#1C3048] text-[23px] font-[500] pt-4 my-3">
                Templates with the same style and concept
              </h2>
            )}

            <Box>
              {anotherTempLoad ? (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={`500px`}
                  style={{
                    borderRadius: `4px`,
                    margin: "10px 0",
                  }}
                />
              ) : (
                <Box sx={{ minHeight: "500px" }}>
                  <StackGrid columnWidth={screenWidth / multiSizeFixSize}>
                    {anotherData?.datas
                      ?.filter(
                        (t: any) => t.template_id !== template?.template_id
                      )
                      ?.map((templates: DataType, index: number) => (
                        <Link
                          key={index}
                          href={`/templates/p/${templates.id_name}`}
                          onClick={(e) => e.preventDefault()}
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
                            onClick={() => {
                              window.history.replaceState(
                                {},
                                "",
                                `/templates/p/${templates?.id_name}`
                              );
                              setId("");
                              setTemplate({});
                              setAnotherData([]);
                              setIsLoading(true);
                              setId(templates?.id_name);
                            }}
                          >
                            <div className="w-full h-full p-[8px] relative">
                              {templates.is_premium && (
                                <span className="w-[28px] absolute right-[13px] top-[13px] z-[1]">
                                  <Icons.proIcon svgProps={{ width: 28 }} />
                                </span>
                              )}

                              <img
                                src={`/api/image/compress?url=${encodeURIComponent(
                                  templates?.template_thumb
                                )}`}
                                alt={templates?.category_name}
                                className={`w-full h-full rounded-[5px] cursor-pointer `}
                                style={{
                                  border: "1px solid #80808082",
                                }}
                              />

                              {/* <Image
                                src={templates?.template_thumb}
                                alt={templates?.category_name}
                                width={150}
                                height={150}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  border: "1px solid #80808082",
                                }}
                              /> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </StackGrid>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Box>
      </Box>
      {open && (
        <ShowPremiumDialog
          open={showPremiumBox}
          setOpen={setShowPremiumBox}
          tempData={{
            id: template?.string_id,
            type: 0,
            usdAmount: template?.usdAmount,
            usdVal: template?.usdVal,
            inrAmount: template?.inrAmount,
            inrVal: template?.inrVal,
          }}
        />
      )}
    </Box>
  );
}
