import React, { useState } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";

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
  } = playgroup;

  const icons = {
    time: "/time.svg",
    location: "/location.svg",
    age: "/age.svg",
    parking: {
      show: Parking === "Yes",
      src: "/parking.svg",
      tooltip: "Parking Available",
    },
    coffee: {
      show: Coffee === "Yes",
      src: "/coffee.svg",
      tooltip: "Coffee",
    },
    wifi: {
      show: WiFi === "Yes",
      src: "/wifi.svg",
      tooltip: "WiFi Available",
    },
    indoor: {
      show: Outdoor === "No",
      src: "/indoor.svg",
      tooltip: "Indoor",
    },
    outdoor: {
      show: Outdoor === "Yes",
      src: "outdoor.svg",
      tooltip: "Outdoor",
    },
    // Assuming Language should always be shown; adjust if needed
    language: {
      show: true,
      src: `/${Language.toLowerCase()}.svg`, //// Dynamic path to your language icon
      tooltip: Language,
    },
  };

  const [tooltip, setTooltip] = useState("");

  // Conditional style classes
  const cardStyle =
    Cancelled === "Yes" ? "bg-gray-400 opacity-50" : "bg-blue-100";
  const cancelledTextStyle = "text-red-500 text-xl font-bold";
  const cardClasses = `shadow-lg rounded-lg overflow-hidden m-6 relative ${cardStyle}`;
  const moreInfoStyle =
    Cancelled === "Yes"
      ? "bg-red-200 text-red-700 hover:bg-red-300 hover:text-red-800"
      : "bg-blue-200 text-indigo-600 hover:text-indigo-800 visited:text-purple-600";

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
            {Name}
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-500 bg-gray-200 mt-2 px-4 py-1 rounded-full">
          {Service}
        </div>
      </div>
      <div className="px-6 pb-4">
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
      {URL && (
        <div
          className={`py-4 px-6 ${Cancelled === "Yes" ? "relative z-20" : ""}`}
          style={{
            backgroundColor: Cancelled === "Yes" ? "#fee2e2" : "#bfdbfe",
          }}
        >
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-md px-3 py-1 transition duration-300 ease-in-out ${moreInfoStyle}`}
          >
            More Info
          </a>
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3">
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

export default PlaygroupCard;
