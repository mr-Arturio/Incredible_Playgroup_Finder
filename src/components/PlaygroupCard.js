import React from "react";



function PlaygroupCard({ playgroup }) {
  const { Date, Time, Name, Address, Age, Day, Language, URL, Service } =
    playgroup;

    const icons = {
      time: "/time.svg",
      location: "/location.svg",
      age: "/age.svg",
      language: `/${Language.toLowerCase()}.svg`, // Dynamic path to your language icon
    };

  return (
    <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden m-6 relative">
      <div className="flex justify-between items-start p-6">
        <div>
          <h2 className="block mt-2 text-xl leading-tight font-semibold text-gray-800">
            {Name}
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
          {Service}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-center text-gray-700">
          <img src={icons.time} alt="Time" className="h-5 w-5 text-gray-500" />
          <span className="ml-2">{Time}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <img
            src={icons.location}
            alt="Location"
            className="h-5 w-5 text-gray-500"
          />
          <span className="ml-2">{Address}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <img src={icons.age} alt="Age" className="h-5 w-5 text-gray-500" />
          <span className="ml-2">{Age} Years</span>
        </div>
      </div>
      {URL && (
        <div className="bg-blue-200 p-4">
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
      <div className="absolute bottom-4 right-4 flex items-center">
        <img
          src={icons.language}
          alt={`${Language} icon`}
          className="h-7 w-7"
        />
      </div>
    </div>
  );
}

export default PlaygroupCard;