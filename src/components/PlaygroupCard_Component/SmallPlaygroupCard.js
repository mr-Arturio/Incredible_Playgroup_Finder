import React from "react";
import Image from "next/image";

function SmallPlaygroupCard({ playgroup, onExpand }) {
  const {
    Date,
    Time,
    Name,
    Day,
    Service,
    URL,
  } = playgroup;

  const cardStyle = "bg-blue-100";
  const cardClasses = `rounded-lg overflow-hidden m-6 relative ${cardStyle}`;

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center px-7 py-5">
        <div>
          <h2 className="block text-xl leading-tight font-semibold text-gray-800">
            <a
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {Name}
            </a>
          </h2>
          <p className="text-gray-600 text-sm">
            {Day}, {Date}
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-500 bg-gray-200 px-4 py-1 rounded-full">
          {Service}
        </div>
        <div className="flex items-center">
          <Image
            src='/time.svg'
            alt="Time"
            width={20}
            height={20}
          />
          <span className="ml-2">{Time}</span>
        </div>
        {/* More Information Arrow Button */}
        <button
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
}

export default SmallPlaygroupCard;