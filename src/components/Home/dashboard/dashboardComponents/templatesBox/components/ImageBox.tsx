import Icons from "@/src/assets";
import { calculateHeight } from "@/src/commonFunction/calculateHeight";
import { useScreenWidth } from "@/src/commonFunction/screenWidthHeight";
import { TemplateDataType } from "@/src/interface/commonType";
import { modalClosePath } from "@/src/redux/reducer/actionDataReducer";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useDispatch } from "react-redux";

interface ImageBoxesProps {
  templates: TemplateDataType;
  uniqueCat: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIdName: React.Dispatch<React.SetStateAction<string>>;
  height: number | any;
}

export default function ImageBox({
  templates,
  uniqueCat,
  height,
  setIdName,
  setOpenModal,
}: ImageBoxesProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef: React.RefObject<HTMLInputElement> | any = useRef(null);
  const [showPreviewButton, setShowPreviewButton] = useState<boolean>(false);
  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(
          (prevIndex: number) => (prevIndex + 1) % templates?.thumbArray.length
        );
      }, 1300);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isHovered, templates?.thumbArray]);

  const handleMouseEnter = () => {
    setShowPreviewButton(true);
    if (screenWidth > 600) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPreviewButton(false);
    if (screenWidth > 600) {
      setIsHovered(false);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="relative">
      <span
        className="w-[28px] absolute top-[16px] z-[1] cursor-pointer"
        style={{
          right: templates.is_premium ? "47px" : "15px",
          opacity: showPreviewButton && !(isMobile || isTablet) ? "1" : "0",
          transition: "0.3s all",
        }}
        onClick={() => {
          setOpenModal(true);
          setIdName(templates?.id_name);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icons.PreviewIcon svgProps={{ width: 27, height: 27 }} />
      </span>

      {templates.is_premium && (
        <span className="w-[28px] absolute right-[13px] top-[16px] z-[1]">
          <Icons.proIcon svgProps={{ width: 27, height: 27 }} />
        </span>
      )}
      <div>
        <Link
          className={`h-auto bg-white cursor-pointer block ${
            uniqueCat
              ? "p-3 max-sm:p-1 max-w-[250px] max-sm:max-w-[130px]"
              : "p-[7px] max-sm:p-1"
          } rounded-[12px]`}
          key={templates?.id_name}
          href={`/templates/p/${templates?.id_name}`}
          scroll={true}

          // onClick={(e) => {
          //   if (!isMobile) {
          //     e.preventDefault();
          //   }
          // }}
        >
          <Box
          // onClick={() => {
          //   if (!isMobile) {
          //     setIdName(templates?.id_name);
          //     setOpenModal(true);
          //     window.history.replaceState(
          //       {},
          //       "",
          //       `/templates/p/${templates?.id_name}`
          //     );
          //   }
          // }}
          >
            <Box
              className={` ${
                uniqueCat
                  ? "bg-[#E6E8EE] p-2 max-sm:p-1 h-[165px] max-sm:h-[150px]"
                  : "p-[0px]"
              } rounded-[10px] relative`}
              style={{
                height: uniqueCat
                  ? "auto"
                  : `${calculateHeight(
                      templates?.width,
                      templates?.height,
                      height
                    )}px`,
                width: uniqueCat ? "auto" : `${height}px`,
              }}
              onClick={() => {
                dispatch(modalClosePath(`/`));
              }}
            >
              <div
                className="custom-carousel w-full h-full overflow-hidden cursor-pointer rounded-[5px]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="carousel-slider w-full h-full "
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {templates?.thumbArray.map((image: string, index: number) => (
                    <div
                      className="bg-slate-200 flex justify-center w-full h-full rounded-[4px] carousel-slide"
                      key={index}
                    >
                      <img
                        src={`/api/image/compress?url=${encodeURIComponent(
                          image
                        )}`}
                        alt={image}
                        className={`w-[auto] ${
                          uniqueCat ? "h-[100%]" : ""
                        }  mx-auto rounded-[4px] opacity-0`}
                        style={{
                          transition: "0.8s all",
                          height: "auto",
                          width: "auto",
                        }}
                        onLoad={(e) =>
                          (e.target as HTMLImageElement).classList.remove(
                            "opacity-0"
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {isHovered && templates?.thumbArray?.length > 1 && (
                <p
                  className="absolute bottom-[10px] w-[45px] flex justify-center left-[10px] bg-[#11171d99] font-[600] text-[white] text-[10px] py-[1px] px-[4px] rounded-[8px]"
                  style={{ transition: "0.5s all" }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="w-[9px]"> {currentIndex + 1} </span> OF{" "}
                  {templates?.thumbArray.length}
                </p>
              )}
            </Box>
          </Box>

          <Box
            className="pt-2"
            style={{
              width: uniqueCat ? "auto" : `${height}px`,
            }}
          >
            <Typography className="text-ellipsis max-sm:text-[12px] w-[100%] whitespace-nowrap overflow-hidden text-black font-medium">
              {templates?.template_name}
            </Typography>
            <Typography className="text-[#ABB2C7] text-[13px] pb-1 max-sm:hidden">
              {templates?.category_name}
            </Typography>
          </Box>
        </Link>
      </div>
    </div>
  );
}
