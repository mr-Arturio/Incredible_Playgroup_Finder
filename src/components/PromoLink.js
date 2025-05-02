"use client";
import { track } from "@vercel/analytics";
import Tooltip from "../utils/Tooltip";

const PromoLink = ({
  tooltipClassName = "bg-gray-100/25 text-sm font-sans border border-gray-300 shadow-md hidden md:flex",
  linkClassName = "hidden md:flex font-bold text-2xl text-introText tracking-wider cursor-pointer drop-shadow-[0_0_10px_rgba(255,105,180,0.6)] transition duration-300 hover:drop-shadow-[0_0_20px_rgba(255,105,180,0.9)] hover:scale-105",
}) => {
  const handleClick = () => {
    track("iep_workshop_click", {
      label: "IEP Workshop – May 10",
      device: isMobile ? "mobile" : "desktop",
    });
  };

  return (
    <Tooltip
      text="Individualized Education Plans Workshop"
      className={tooltipClassName}
    >
      <a
        href="https://www.eventbrite.ca/e/individualized-education-plans-tickets-1308536139819?aff=oddtdtcreator"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <p className={linkClassName}>IEP Workshop - May 10</p>
      </a>
    </Tooltip>
  );
};

export default PromoLink;
