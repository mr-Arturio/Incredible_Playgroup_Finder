import React from "react";
import Image from "next/image";
import AddToCalendar from "./AddToCalendar";

function CardHeader({
  Organizer,
  Organizer_fr,
  URL,
  URL_fr,
  PG_URL,
  PG_URL_fr,
  Day,
  eventDate,
  Service,
  Service_fr,
  Location,
  Cancelled,
  Paused,
  Time,
  Address,
  startTime,
  endTime,
  Registration,
  Registration_URL,
  translation,
}) {
  const serviceUrl = translation === "en" ? PG_URL : PG_URL_fr;
  const organizerUrl = translation === "en" ? URL : URL_fr;

   // Day translation mapping
   const dayTranslations = {
    Mon: "Lun",
    Tue: "Mar",
    Wed: "Mer",
    Thur: "Jeu",
    Fri: "Ven",
    Sat: "Sam",
    Sun: "Dim",
  };

  // Translate the day if the translation is in French
  const translatedDay = translation === "fr" && Day ? dayTranslations[Day] : Day;

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
          <div className="text-sm md:text-base italic text-gray-500">
            {Location}
          </div>
          <p
            className={`mt-1 text-gray-600 md:text-sm text-xs ${
              Cancelled === "yes" || Paused === "yes" ? "mb-2" : ""
            }`}
          >
            {translatedDay || eventDate ? (
              <>
                {translatedDay && `${translatedDay}, `}
                {eventDate}
              </>
            ) : (
              <span>
                {translation === "en"
                  ? "For a complete schedule of French playgroups, please visit "
                  : "Pour obtenir le calendrier complet des groupes de jeu en français, veuillez consulter le "}

                <a
                  href="https://drive.google.com/file/d/1TzILt1grFGg0rqdl8TsfWFd2IUMPRDYI/view"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {translation === "en"
                    ? "French Playgroup Schedules."
                    : "Recueil d’activitiés francophones."}
                </a>
              </span>
            )}
          </p>
        </div>
        <div>
          <div className="md:text-lg text-xs mt-1 font-semibold text-plum bg-gray-200 px-1 md:py-2 py-1 rounded-full text-center">
            {Cancelled !== "yes" ? (
              <a
                href={organizerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoverBlue transition duration-300 ease-in-out"
              >
                {" "}
                {translation === "fr" && Organizer_fr
                  ? Organizer_fr
                  : Organizer}
              </a>
            ) : (
              <span>
                {translation === "fr" && Organizer_fr
                  ? Organizer_fr
                  : Organizer}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray-700 justify-between mb-2 md:mb-1 mt-3.5 md:mt-0">
        <div className="flex items-center">
          <Image
            src="/time.svg"
            alt="Time"
            width={20}
            height={20}
            className="h-4 w-4 md:h-5 md:w-5 text-gray-500"
          />
          <span className="ml-2 md:text-base text-sm ">{Time}</span>
        </div>
        <div className="flex items-center ml-auto md:py-2 py-1 sm:block hidden">
          <button>
            <AddToCalendar
              name={Organizer}
              address={Address}
              date={eventDate}
              startTime={startTime}
              endTime={endTime}
              Cancelled={Cancelled}
              Paused={Paused}
            />
          </button>
        </div>
        {Cancelled !== "yes" && Paused !== "yes" && Registration && (
          <div className="md:text-sm text-xs sm:flex font-semibold bg-gray-200 px-2 py-1 md:ml-2 rounded-full text-center">
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
