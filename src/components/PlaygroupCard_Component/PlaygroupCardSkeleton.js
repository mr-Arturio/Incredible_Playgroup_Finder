import React from "react";

/**
 * Skeleton loader that mirrors PlaygroupCard layout (desktop view).
 * Used in the Playgroup Cards Section while data is loading.
 */
function PlaygroupCardSkeleton() {
  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden m-4 bg-gray-100 animate-pulse"
      aria-hidden="true"
    >
      {/* Header: title, location, date, organizer badge */}
      <div className="flex flex-col px-4 md:px-6 pt-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="h-5 md:h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
            <div className="h-3 md:h-4 bg-gray-300 rounded w-2/5" />
          </div>
          <div className="h-6 md:h-7 bg-gray-300 rounded-full w-20 md:w-24 ml-4 shrink-0" />
        </div>
        {/* Time row */}
        <div className="flex items-center justify-between mb-2 md:mb-1 mt-3.5 md:mt-0">
          <div className="h-4 md:h-5 bg-gray-300 rounded w-24" />
          <div className="h-6 bg-gray-300 rounded w-28 hidden sm:block" />
        </div>
      </div>
      {/* Footer: More Info + icons */}
      <div className="bg-gray-200 p-3 flex justify-between items-center mt-1">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-28 md:w-36" />
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="h-5 w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
          <div className="h-5 w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
          <div className="h-5 w-5 md:h-6 md:w-6 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export default PlaygroupCardSkeleton;
