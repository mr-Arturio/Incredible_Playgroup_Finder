import React from "react";
import Image from "next/image";

function CardDetails({ Address, Age, Notes, icons, social }) {
  return (
    <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col justify-between  md:pr-10 pr-0">
        <div className="flex items-center  text-gray-700">
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
        <div className="flex items-center text-gray-700 justify-between mb-2 md:mb-0 mt-2">
        <div className="flex items-center">
          <Image
            src={icons.age}
            alt="Age"
            className="h-5 w-5 text-gray-500"
            width={20}
            height={20}
          />
          <span className="ml-2">{Age}</span>
        </div>
        <div className="flex sm:hidden items-center md:py-2 py-1 space-x-2">
          {Object.entries(social).map(
            ([key, { show, src, url }]) =>
              show && (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={src}
                    alt={src}
                    className="h-5 w-5 hover:scale-110"
                    width={20}
                    height={20}
                  />
                </a>
              )
          )}
        </div>
        </div>
      </div>
      {Notes && (
        <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-2 md:my-0 md:max-w-sm flex-1">
          <p className="text-gray-800 text-sm">
            <span className="font-bold">Special Notes:</span> {Notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
