import Icons from "@/src/assets";
import { calculateHeight } from "@/src/commonFunction/calculateHeight";
import { TemplateDataType } from "@/src/interface/commonType";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface ImageBoxProps {
  templates: TemplateDataType | any;
  screenWidth: number;
  multiSizeFixSize: number;
  setIdName: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  index?: number;
}

export default function ImageBox({
  templates,
  screenWidth,
  multiSizeFixSize,
  setIdName,
  setOpenModal,
}: ImageBoxProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef: React.RefObject<HTMLInputElement> | any = useRef(null);
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
    if (screenWidth > 600) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (screenWidth > 600) {
      setIsHovered(false);
      setCurrentIndex(0);
    }
  };

  return (
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
    >
      <Link
        href={`/templates/p/${templates.id_name}`}
        // onClick={(e) => {
        //   if (!isMobile) {
        //     e.preventDefault();
        //   }
        // }}
      >
        <div
          className="w-full h-full p-[8px] relative"
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
          {templates.is_premium && (
            <>
              <span className="w-[28px] absolute right-[13px] top-[13px] z-[1]">
                <Icons.proIcon svgProps={{ width: 28 }} />
              </span>
            </>
          )}
          <div
            className="custom-carousel w-full h-full overflow-hidden cursor-pointer rounded-[5px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ border: "1px solid #80808082" }}
          >
            <div
              className="carousel-slider w-full h-full "
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {templates?.thumbArray.map((image: string, index: number) => (
                <div
                  className="carousel-slide"
                  key={index}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={`/api/image/compress?url=${encodeURIComponent(image)}`}
                    alt={image}
                    className={`w-full h-full rounded-[5px] cursor-pointer opacity-0`}
                    style={{ transition: "0.5s all" }}
                    onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                      e.currentTarget.classList.remove("opacity-0")
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
            >
              <span className="w-[9px]"> {currentIndex + 1} </span> OF{" "}
              {templates?.thumbArray.length}
            </p>
          )}

          <div className="pt-2">
            <p className="text-ellipsis max-sm:text-[14px] w-[100%] whitespace-nowrap overflow-hidden text-black font-medium">
              {templates?.template_name}
            </p>
            <p className="text-[#ABB2C7] text-[13px] max-sm:text-[12px] pb-1">
              {templates?.category_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
