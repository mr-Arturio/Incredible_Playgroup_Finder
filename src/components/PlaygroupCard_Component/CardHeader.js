import React from "react";

function CardHeader({ URL, Name, Day, Date, Service, Cancelled }) {
  return (
    <div className="flex justify-between items-start px-5 md:px-6 pt-3 pb-3">
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
      <div className="md:text-lg text-sm font-semibold text-gray-500 bg-gray-200 mt-2 px-2 py-1 rounded-full text-center">
        {Service}
      </div>
    </div>
  );
}

export default CardHeader;
