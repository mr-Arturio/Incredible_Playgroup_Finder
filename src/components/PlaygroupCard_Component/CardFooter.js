import React from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
import { AddToCalendarButton } from "add-to-calendar-button-react";

function CardFooter({
  icons,
  tooltip,
  setTooltip,
  onExpand,
  isExpanded,
  name,
  address,
  date,
  startTime,
  endTime,
  Cancelled,
}) {
  return (
    <div className="bg-blue-200 p-3 flex justify-between items-center">
      <div className="flex">
        {isExpanded ? (
          <button
            onClick={onExpand}
            className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-200 md:ml-3 ml-1"
            aria-label="Show Less"
          >
            <Image
              src="doubleArrowUp.svg"
              alt="Show Less"
              width={17}
              height={17}
              className="inline-block"
            />
            <span className="md:ml-2 ml-1 inline-block sm:text-base text-sm">
              Show Less
            </span>
          </button>
        ) : (
          <button
            onClick={onExpand}
            className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-200 md:ml-3 ml-1"
            aria-label="More Information"
          >
            <Image
              src="double_arrow.svg"
              alt="More Information"
              width={16}
              height={16}
              className="inline-block"
            />
            <div>
              <span className="md:hidden inline-block sm:text-base text-sm ml-2 ">
                More Info
              </span>
              <span className="hidden md:inline-block sm:text-base text-sm ml-2">
                More Information
              </span>
            </div>
          </button>
        )}
        {Cancelled !== "Yes" ? ( // Conditionally render AddToCalendarButton
          <div className="ml-3 hidden sm:flex">
            <AddToCalendarButton
              name={name}
              options={["Google", "Outlook.com", "Apple"]}
              location={address}
              startDate={date}
              endDate={date}
              startTime={startTime}
              endTime={endTime}
              timeZone="Canada/Eastern"
              size="1"
              listStyle="modal"
              buttonStyle="text"
              trigger="click"
            ></AddToCalendarButton>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center md:space-x-3 space-x-2">
        {Object.entries(icons).map(
          ([key, { show, src, tooltip: iconTooltip }]) =>
            show && (
              <Tooltip
                key={key}
                text={tooltip === iconTooltip ? iconTooltip : ""}
              >
                <div
                  onMouseEnter={() => setTooltip(iconTooltip)}
                  onMouseLeave={() => setTooltip("")}
                >
                  <Image
                    src={src}
                    alt={iconTooltip}
                    className="h-7 w-7"
                    width={28}
                    height={28}
                  />
                </div>
              </Tooltip>
            )
        )}
      </div>
    </div>
  );
}

export default CardFooter;
