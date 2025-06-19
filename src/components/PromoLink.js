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
    track("Countdown to Kindergarten", { label: "PRC Virtual Workshop - July 16" });
  };

  const eventUrl = "https://www.eventbrite.ca/e/countdown-to-kindergarten-tickets-1405819998459?aff=oddtdtcreator";

  return (
    <>
      {/* Desktop */}
      {imageClassName !== "hidden" && (
        <Tooltip
          text="July 16, 6:00pm. By Ottawa Parent Resource Centre."
          className={tooltipClassName}
        >
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <img
              src="/Countdown_to_Kindergarten.png"
              alt="Countdown to Kindergarten Workshop Banner"
              className={imageClassName}
            />
          </a>
        </Tooltip>
      )}

      {/* Mobile */}
      {mobileTextClassName !== "hidden" && (
        <Tooltip
        text="PRC Virtual Workshop - July 16"
        className={mobileTooltipClassName}
        >
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={mobileTextClassName}
          >
            Countdown to Kindergarten
          </a>
        </Tooltip>
      )}
    </>
  );
};

export default PromoLink;
