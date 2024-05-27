import React, { useState } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
import getIcons from "../../utils/icons";

function SmallPlaygroupCard({ playgroup, onExpand }) {
  const {
    Date,
    Time,
    Name,
    Day,
    Language,
    URL,
    Service,
    Parking,
    Coffee,
    WiFi,
    Outdoor,
    Cancelled,
  } = playgroup;

  const icons = getIcons(Parking, Coffee, WiFi, Outdoor, Language);
  const [tooltip, setTooltip] = useState("");
  const cancelledTextStyle = "text-red-500 text-2xl font-bold";

  return (
    <>
      {Cancelled === "Yes" && (
        <div
          className="absolute z-10 w-full h-full flex justify-center items-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            className={cancelledTextStyle}
            style={{ pointerEvents: "auto" }}
          >
            Cancelled
          </span>
        </div>
      )}
      <div className="flex justify-between items-start px-5 pt-3 pb-3">
        <div>
          <h2 className="block mt-2 md:text-xl text-lg leading-tight font-semibold text-gray-800">
            {Cancelled !== "Yes" ? (
              <a
                href={URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {Name}
              </a>
            ) : (
              Name
            )}
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="md:text-lg text-sm font-semibold text-gray-500 bg-gray-200 mt-2 px-2 py-1 rounded-full text-center">
          {Service}
        </div>
      </div>
      <div className="px-6 pb-3">
        <div className="flex items-center text-gray-700">
          <Image src="/time.svg" alt="Time" width={20} height={20} />
          <span className="ml-2">{Time}</span>
        </div>
      </div>

      <div className="bg-blue-200 p-3 flex justify-between items-center ">
        {Cancelled === "Yes" ? (
          <button
            onClick={URL ? () => window.open(URL, "_blank") : () => {}}
            className="flex items-center px-3 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transform hover:scale-105 transition-transform duration-200 ease-in-out shadow hover:shadow-md ml-3"
            aria-label="More Information"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="inline-block">More Information</span>
          </button>
        ) : (
          <>
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
                {/* Visible only on small screens */}
                <span className="md:hidden inline-block sm:text-base text-sm ml-2 ">
                  More Info
                </span>

                {/* Visible from medium screens and up */}
                <span className="hidden md:inline-block sm:text-base text-sm ml-2">
                  More Information
                </span>
              </div>
            </button>
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
          </>
        )}
      </div>
    </>
  );
}

export default SmallPlaygroupCard;
