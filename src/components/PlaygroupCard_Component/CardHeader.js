import React from "react";
import Image from "next/image";
import AddToCalendar from "./AddToCalendar";
import { getNextOccurrence } from "../../utils/dateUtils";

function CardHeader({
  Organizer,
  Organizer_fr,
  URL,
  URL_fr,
  PG_URL,
  PG_URL_fr,
  Day,
  Date,
  Repeats,
  Service,
  Service_fr,
  Cancelled,
  Time,
  address,
  startTime,
  endTime,
  Registration,
  Registration_URL,
  translation,
}) {
  const serviceUrl = translation === "en" ? PG_URL : PG_URL_fr;
  const organizerUrl = translation === "en" ? URL : URL_fr;

    // Calculate the next occurrence if Date is not provided
    const displayDate = Date || getNextOccurrence(Day, Repeats)?.toISOString().split("T")[0] || "";

  return (
    <div className="flex flex-col px-4 md:px-6 pt-3 ">
      <div className="flex justify-between items-start">
        <div>
          <div className="block mt-1 md:text-xl text-base leading-tight font-semibold text-hoverBlue">
            <a
              href={serviceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mainBlue transition duration-300 ease-in-out"
            >
              {translation === "en" || !Service_fr ? Service : Service_fr}
            </a>
          </div>
          <p className="mt-1 text-gray-600 text-sm">
            {Day}, {displayDate}
          </p>
        </div>
        <div>
          <div className="md:text-lg text-xs font-semibold text-plum bg-gray-200 px-1 md:py-2 py-1 rounded-full text-center">
            {Cancelled !== "Yes" ? (
              <a
                href={organizerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoverBlue transition duration-300 ease-in-out"
              >
                {translation === "en" || !Organizer_fr
                  ? Organizer
                  : Organizer_fr}
              </a>
            ) : (
              Organizer
            )}
          </div>
          {/* registration element for mobile screens */}
          {Registration && (
            <div className=" hidden md:text-sm text-xs font-semibold  bg-gray-200 px-2 py-1 rounded-full text-center">
              <a
                href={Registration_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:text-hoverBlue transition duration-300 ease-in-out"
              >
                {translation === "en" ? "Registration" : "Inscription"}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center text-gray-700 justify-between mb-1 mt-2">
        <div className="flex items-center">
          <Image src="/time.svg" alt="Time" width={20} height={20} />
          <span className="ml-2 md:text-base text-sm ">{Time}</span>
        </div>
        <div className="flex items-center ml-auto md:py-2 py-1">
          <button>
            <AddToCalendar
              name={Organizer}
              address={address}
              date={displayDate}
              startTime={startTime}
              endTime={endTime}
              Cancelled={Cancelled}
            />
          </button>
        </div>
        {Registration && (
          <div className="md:text-sm sm:text-xs hidden sm:flex font-semibold  bg-gray-200 px-2 py-1 md:ml-2 rounded-full text-center">
            <a
              href={Registration_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:text-hoverBlue transition duration-300 ease-in-out"
            >
              {translation === "en" ? "Registration" : "Inscription"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardHeader;
