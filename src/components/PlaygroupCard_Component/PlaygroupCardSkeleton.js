import React from "react";


function PlaygroupCardSkeleton() {
  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden m-2 sm:m-3 md:m-4 bg-gray-100 animate-pulse min-w-0"
      aria-hidden="true"
    >
      {/* Header: title, location, date, organizer badge */}
      <div className="flex flex-col px-3 sm:px-4 md:px-6 pt-2 sm:pt-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 max-w-full mb-1.5 sm:mb-2" />
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/2 max-w-[8rem] sm:max-w-none mb-1.5 sm:mb-2" />
            <div className="h-3 sm:h-3 md:h-4 bg-gray-300 rounded w-2/5 max-w-full" />
          </div>
          <div className="h-5 w-16 sm:h-6 sm:w-20 md:h-7 md:w-24 bg-gray-300 rounded-full shrink-0" />
        </div>
        {/* Time row */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-1 mt-2.5 sm:mt-3.5 md:mt-0">
          <div className="h-3 sm:h-4 md:h-5 bg-gray-300 rounded w-20 sm:w-24 shrink-0" />
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-24 sm:w-28 hidden sm:block shrink-0" />
        </div>
      </div>
      {/* Footer: More Info + icons */}
      <div className="bg-gray-200 p-2 sm:p-3 flex justify-between items-center mt-1 gap-2 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-300 rounded shrink-0" />
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-28 md:w-36 max-w-full" />
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
          <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
          <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export default PlaygroupCardSkeleton;
