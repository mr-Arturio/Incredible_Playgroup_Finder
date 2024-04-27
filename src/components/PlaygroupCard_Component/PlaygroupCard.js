import React, { useState } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
import getIcons from "../../utils/icons";

function PlaygroupCard({ playgroup }) {
  const {
    Date,
    Time,
    Name,
    Address,
    Age,
    Day,
    Language,
    URL,
    Service,
    Parking,
    Coffee,
    WiFi,
    Outdoor,
    Cancelled,
    Notes,
  } = playgroup;

  const icons = getIcons(Parking, Coffee, WiFi, Outdoor, Language);

  const [tooltip, setTooltip] = useState("");

  // Conditional style classes
  const cardStyle =
    Cancelled === "Yes" ? "bg-gray-400 opacity-50" : "bg-blue-100";
  const cancelledTextStyle = "text-red-500 text-xl font-bold";
  const cardClasses = `shadow-lg rounded-lg overflow-hidden m-6 relative ${cardStyle}`;

  return (
    <div className={cardClasses}>
      {Cancelled === "Yes" && (
        <div className="absolute z-10 w-full h-full flex justify-center items-center">
          <span className={cancelledTextStyle}>Cancelled</span>
        </div>
      )}
      <div className="flex justify-between items-start px-7 pt-5 pb-3">
        <div>
          <h2 className="block mt-2 text-xl leading-tight font-semibold text-gray-800">
            <a
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {Name}
            </a>
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-500 bg-gray-200 mt-2 px-4 py-1 rounded-full">
          {Service}
        </div>
      </div>
      <div className="px-6 pb-4 flex justify-between">
        {/* First column for Time, Address, and Age */}
        <div className="flex flex-col justify-between mr-4 pr-10">
          <div className="flex items-center text-gray-700">
            <Image
              src={icons.time}
              alt="Time"
              className="h-5 w-5 text-gray-500"
              width={20}
              height={20}
            />
            <span className="ml-2">{Time}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <Image
              src={icons.location}
              alt="Location"
              className="h-5 w-5 text-gray-500"
              width={20}
              height={20}
            />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                Address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:text-blue-700"
              style={{ textDecoration: "underline" }}
            >
              {Address}
            </a>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <Image
              src={icons.age}
              alt="Age"
              className="h-5 w-5 text-gray-500"
              width={20}
              height={20}
            />
            <span className="ml-2">{Age}</span>
          </div>
        </div>
        {/* Second column for Notes */}
        {Notes && (
          <div className="bg-gray-100 flex-1 p-2 rounded-lg shadow-md p-2 max-w-sm">
            <p className="text-gray-800 text-sm">
              <span className="font-bold">Special Notes:</span> {Notes}
            </p>
          </div>
        )}
      </div>

      {Cancelled !== "Yes" && (
        <div className="bg-blue-200 p-3 flex justify-end items-center space-x-3">
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
      )}
    </div>
  );
}

export default PlaygroupCard;
