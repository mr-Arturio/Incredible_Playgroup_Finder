import React from "react";
import Image from "next/image";

function SmallPlaygroupCard({ playgroup, onExpand }) {
  const { Date, Time, Name, Day, Service, URL } = playgroup;

  return (
    <>
      <div className="flex justify-between items-start px-5 pt-3 pb-3">
        <div>
          <h2 className="block mt-2 text-xl leading-tight font-semibold text-gray-800">
            <a
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {Name}
            </a>
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-500 bg-gray-200 mt-2 px-4 py-1 rounded-full">
          {Service}
        </div>
      </div>
      <div className="px-6 pb-3">
        <div className="flex items-center text-gray-700">
          <Image src="/time.svg" alt="Time" width={20} height={20} />
          <span className="ml-2">{Time}</span>
        </div>
      </div>

      <div className="bg-blue-200 p-3 justify-start items-center flex">
        <button
          onClick={onExpand}
          className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-200 ml-3"
          aria-label="More information"
        >
          <Image
            src="double_arrow.svg"
            alt="More Information"
            width={17}
            height={17}
            className="inline-block"
          />
          <span className="ml-2 inline-block">More Information</span>
        </button>
      </div>
    </>
  );
}

{
  /* <span className="ml-2">{Time}</span>
        </div>
        </div>
        </div> */
}
{
  /* More Information Arrow Button */
}
{
  /* <button
          onClick={onExpand}
          className="text-gray-800 hover:text-blue-600 focus:outline-none"
          aria-label="More information"
        >
          <Image
            src="double_arrow.svg"
            alt="More Information"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
} */
}

export default SmallPlaygroupCard;
