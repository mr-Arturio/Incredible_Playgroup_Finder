import React from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
// import AddToCalendar from "./AddToCalendar";

function CardFooter({
  icons,
  social,
  tooltip,
  setTooltip,
  onExpand,
  isExpanded,
  translation,
}) {
  return (
    <div className={`bg-cardFooter p-3 flex justify-between items-center ${isExpanded ? 'md:mt-3' : 'mt-1'}`}>
      <div className="flex">
        {isExpanded ? (
          <button
            onClick={onExpand}
            className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transform hover:scale-95 transition-transform duration-200 md:ml-3 ml-1"
            aria-label="Show Less"
          >
            <Image
              src="doubleArrowUp.svg"
              alt="Show Less"
              width={17}
              height={17}
              className="inline-block h-3 w-3 md:h-4 md:w-4"
            />
            <span className="md:ml-2 ml-1 inline-block sm:text-base text-sm">
              {translation === "en" ? "Show Less" : "Mostrar Menos"}
            </span>
          </button>
        ) : (
          <button
            onClick={onExpand}
            className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transform hover:scale-95 transition-transform duration-200 md:ml-3 ml-1"
            aria-label="More Information"
          >
            <Image
              src="double_arrow.svg"
              alt="More Information"
              width={16}
              height={16}
              className="inline-block h-3 w-3 md:h-4 md:w-4"
            />
            <div>
              <span className="md:hidden inline-block sm:text-base text-sm ml-2 ">
                {translation === "en" ? "More Info" : "Más Info"}
              </span>
              <span className="hidden md:inline-block sm:text-base text-sm ml-2">
                {translation === "en" ? "More Information" : "Más Información"}
              </span>
            </div>
          </button>
        )}
        <div className="hidden sm:flex space-x-1.5 ml-2.5">
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
      <div className="flex items-center space-x-1.5 md:space-x-2 overflow-visible">
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
                    className="h-5 w-5 md:h-6 md:w-6"
                    width={24}
                    height={24}
                  />
                </div>
              </Tooltip>
            )
        )}
      </div>
    </div>
  );
}

export default CardFooter;
