import React from "react";

function MapSkeleton() {
  return (
    <div
      className="w-full min-h-[180px] sm:min-h-[200px] h-full content-start mt-0 lg:ml-0 xl:pl-1 rounded-md md:rounded-t-none overflow-hidden shadow-md bg-gray-200 animate-pulse relative"
      aria-hidden="true"
    >
      {/* Subtle grid to suggest map tiles */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px p-px opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-gray-300/50 rounded-sm" />
        ))}
      </div>
      {/* Center: spinning circle + Loading text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4">
        <div
          className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
        <span className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
          Loading
        </span>
      </div>
    </div>
  );
}

export default MapSkeleton;
