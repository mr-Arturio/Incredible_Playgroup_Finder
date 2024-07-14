import React from "react";
import Image from "next/image";
import AddToCalendar from "./AddToCalendar";

function CardHeader({
  URL,
  Name,
  Day,
  Date,
  Service,
  Cancelled,
  Time,
  address,
  startTime,
  endTime,
  Registration,
  Reg_URL,
}) {
  return (
    <div className="flex flex-col px-5 md:px-6 pt-3 ">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="block mt-1 md:text-xl text-lg leading-tight font-semibold text-gray-800">
            {Cancelled !== "Yes" ? (
              <a
                href={URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-plum hover:text-hoverBlue transition duration-300 ease-in-out"
              >
                {Name}
              </a>
            ) : (
              Name
            )}
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div>
          <div className="md:text-lg text-sm font-semibold text-gray-500 bg-gray-200 mt-2 px-2 py-1 rounded-full text-center">
            {Service}
          </div>
          {/* registration element for mibile screens */}
          <div className=" hidden md:text-sm text-xs font-semibold  bg-gray-200 px-2 py-1 rounded-full text-center">
            <a
              href={Reg_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:text-hoverBlue transition duration-300 ease-in-out"
            >
              {Registration}
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray-700 justify-between pb-1 mt-2">
        <div className="flex items-center">
          <Image src="/time.svg" alt="Time" width={20} height={20} />
          <span className="ml-2">{Time}</span>
        </div>
        <div className="flex items-center ml-auto mr-3">
          <AddToCalendar
            name={Name}
            address={address}
            date={Date}
            startTime={startTime}
            endTime={endTime}
            Cancelled={Cancelled}
          />
        </div>
        <div className="md:text-sm text-xs font-semibold  bg-gray-200 px-2 py-1 rounded-full text-center">
          <a
            href={Reg_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-hoverBlue transition duration-300 ease-in-out"
          >
            {Registration}
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardHeader;
