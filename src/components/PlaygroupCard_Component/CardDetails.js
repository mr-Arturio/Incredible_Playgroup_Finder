import React from "react";
import Image from "next/image";
import AddToCalendar from "./AddToCalendar";

function CardDetails({
  Address,
  Age,
  Notes,
  icons,
  social,
  translation,
  Organizer,
  eventDate,
  startTime,
  endTime,
  Cancelled,
  Paused,
}) {
  const ageTranslations = {
    "Baby (non-walking)":
      translation === "fr" ? "Bébé (non marchant)" : "Baby (non-walking)",
    "Baby (0-12m)": translation === "fr" ? "Bébé (0-12mois)" : "Baby (0-12m)",
    "Baby (0-18m)": translation === "fr" ? "Bébé (0-18mois)" : "Baby (0-18m)",
    "Baby (0-24m)": translation === "fr" ? "Bébé (0-24mois)" : "Baby (0-24m)",
    "Child (0-6y)": translation === "fr" ? "Enfant (0-6ans)" : "Child (0-6y)",
    "Child (3-6y)": translation === "fr" ? "Enfant (3-6ans)" : "Child (3-6y)",
    "Child (4-10y)":
      translation === "fr" ? "Enfant (4-10ans)" : "Child (4-10y)",
  };

  const renderNotes = (notes) => {
    // Regular expression to match pairs of (URL linkText)
    const linkRegex = /\((https?:\/\/[^\s]+) ([^)]+)\)/g;

    // Replace all occurrences of the (URL linkText) pattern
    const noteWithLinks = notes.replace(linkRegex, (url, linkText) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700">${linkText}</a>`;
    });

    // Return a div with dangerouslySetInnerHTML to display the parsed HTML
    return (
      <div
        dangerouslySetInnerHTML={{ __html: noteWithLinks }}
        className="notes-container"
      />
    );
  };

  return (
    <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:pr-10 pr-0">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <Image
              src={icons.location}
              alt="Location"
              className="h-4 w-4 md:h-5 md:w-5 text-gray-500"
              width={20}
              height={20}
            />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                Address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:text-blue-700 md:text-base text-sm"
              style={{ textDecoration: "underline" }}
            >
              {Address}
            </a>
          </div>
          {/* Add To Calendar Button */}
          <div className="flex items-center ml-auto sm:hidden">
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
        </div>
        <div className="flex items-center text-gray-700 justify-between mb-2 md:mb-0 mt-2">
          <div className="flex items-center">
            <Image
              src={icons.age}
              alt="Age"
              className="h-4 w-4 md:h-5 md:w-5 text-gray-500"
              width={20}
              height={20}
            />
            <span className="ml-2 md:text-base text-sm">
              {ageTranslations[Age] || Age}
            </span>
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
            <span className="font-bold">Special Notes:</span>{" "}
            {renderNotes(Notes)}
          </p>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
