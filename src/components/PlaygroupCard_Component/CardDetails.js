import React from "react";
import Image from "next/image";

function CardDetails({ Address, Age, Notes, icons }) {
  return (
    <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col justify-between mr-4 md:pr-10 pr-0">
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
        <div className="flex items-center py-1 mt-2 text-gray-700">
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
      {Notes && (
        <div className="bg-gray-100 p-2 rounded-lg shadow-md mt-2 md:mt-0 md:max-w-sm flex-1">
          <p className="text-gray-800 text-sm">
            <span className="font-bold">Special Notes:</span> {Notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
