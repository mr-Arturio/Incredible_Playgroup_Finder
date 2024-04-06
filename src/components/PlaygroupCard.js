import React, { useState } from "react";
import Image from "next/image";

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

  return (
    <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden m-6 relative">
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
            width={500}
            height={300}
          />
          <span className="ml-2">{Time}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <Image
            src={icons.location}
            alt="Location"
            className="h-5 w-5 text-gray-500"
            width={500}
            height={300}
          />
          <span className="ml-2">{Address}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <Image
            src={icons.age}
            alt="Age"
            className="h-5 w-5 text-gray-500"
            width={500}
            height={300}
          />
          <span className="ml-2">{Age}</span>
        </div>
      </div>
      {URL && (
        <div className="bg-blue-200 py-4 px-6">
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
          >
            More Info
          </a>
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3">
        {Object.entries(icons).map(
          ([key, { show, src, tooltip: iconTooltip }]) =>
            show && (
              <div
                key={key}
                onMouseEnter={() => setTooltip(iconTooltip)}
                onMouseLeave={() => setTooltip("")}
                className="relative"
              >
                <Image
                  src={src}
                  alt={iconTooltip}
                  className="h-7 w-7"
                  width={500}
                  height={300}
                />
                {tooltip === iconTooltip && (
                  <div className="absolute bottom-full mb-2 -ml-4 px-2 py-1 bg-black text-white text-xs rounded-md z-10 whitespace-nowrap">
                    {iconTooltip}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default PlaygroupCard;
