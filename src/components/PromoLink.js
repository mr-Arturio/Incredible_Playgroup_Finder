"use client";
import { track } from "@vercel/analytics";
import Tooltip from "../utils/Tooltip";

const PromoLink = ({
  tooltipClassName = "bg-gray-100/25 text-sm font-sans border border-gray-300 shadow-md hidden md:flex",
  imageClassName = "hidden md:flex w-[36rem] h-auto cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 rounded-lg border border-mainBlue hover:border-hoverBlue shadow-sm hover:shadow-lg",
  mobileTooltipClassName = "bg-gray-200 text-sm font-sans border border-gray-300 shadow-md flex md:hidden",
  mobileTextClassName = "md:hidden flex font-bold text-md sm:text-lg text-introText tracking-wider cursor-pointer drop-shadow-[0_0_10px_rgba(255,105,180,0.6)] transition duration-300 hover:drop-shadow-[0_0_20px_rgba(255,105,180,0.9)] hover:scale-105 text-wrap",
}) => {
  const handleClick = () => {
    track("50 years donation", { label: "PRC 50 years donation" });
  };

  const eventUrl = "https://www.parentresource.ca/holidaycampaign";

  return (
    <>
      {/* Desktop */}
      {imageClassName !== "hidden" && (
        <Tooltip
          text="Donate to PRC for 50 years of support"
          className={tooltipClassName}
        >
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <img
              src="/banner/50_years.svg"
              alt="50 years donation banner"
              className={imageClassName}
            />
          </a>
        </Tooltip>
      )}

      {/* Mobile */}
      {mobileTextClassName !== "hidden" && (
        <Tooltip
          text="Donate to Holiday Campaign"
          className={mobileTooltipClassName}
        >
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={mobileTextClassName}
          >
            Donate to Holiday Campaign
          </a>
        </Tooltip>
      )}
    </>
  );
};

export default PromoLink;
