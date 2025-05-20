"use client";
import { track } from "@vercel/analytics";
import Tooltip from "../utils/Tooltip";

const PromoLink = ({
  tooltipClassName = "bg-gray-100/25 text-sm font-sans border border-gray-300 shadow-md hidden md:flex",
  imageClassName = "hidden md:flex w-72 h-auto cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 rounded-lg border border-mainBlue hover:border-hoverBlue shadow-sm hover:shadow-lg",
  mobileTooltipClassName ="bg-gray-200 text-sm font-sans border border-gray-300 shadow-md flex md:hidden",
  mobileTextClassName = "md:hidden flex font-bold text-md sm:text-lg text-introText tracking-wider cursor-pointer drop-shadow-[0_0_10px_rgba(255,105,180,0.6)] transition duration-300 hover:drop-shadow-[0_0_20px_rgba(255,105,180,0.9)] hover:scale-105 text-wrap",
}) => {
  const handleClick = () => {
    track("workshop_click", { label: "PRC Workshop – Jun 4" });
  };

  return (
    <>
      {/* Desktop */}
      {imageClassName !== "hidden" && (
        <Tooltip
          text="June 4, 6:00pm. By Ottawa Parent Resource Centre."
          className={tooltipClassName}
        >
          <a
            href="https://www.eventbrite.ca/e/navigating-your-child-care-options-tickets-1353456818779?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <img
              src="/child_care.png"
              alt="IEP Workshop Banner"
              className={imageClassName}
            />
          </a>
        </Tooltip>
      )}

      {/* Mobile */}
      {mobileTextClassName !== "hidden" && (
        <Tooltip
        text="PRC Virtual Workshop - June 4"
        className={mobileTooltipClassName}
        >
          <a
            href="https://www.eventbrite.ca/e/navigating-your-child-care-options-tickets-1353456818779?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={mobileTextClassName}
          >
            Navigating Your Child Care Options
          </a>
        </Tooltip>
      )}
    </>
  );
};

export default PromoLink;
