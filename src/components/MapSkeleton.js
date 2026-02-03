import React from "react";

/**
 * Skeleton loader for the map area. Fills parent at all breakpoints (mobile, tablet, desktop).
 * Spinner + "Loading" text are centered and responsive.
 */
function MapSkeleton() {
  return (
    <div
      className="w-full min-h-[200px] h-full content-start mt-0 lg:ml-0 xl:pl-1 rounded-md md:rounded-t-none overflow-hidden shadow-md bg-gray-200 animate-pulse relative"
      aria-hidden="true"
    >
      {/* Subtle grid to suggest map tiles */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px p-px opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-gray-300/50 rounded-sm" />
        ))}
      </div>
      {/* Center: spinning circle + Loading text (visible on all screens) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-4">
        <div
          className="h-10 w-10 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
        <span className="text-gray-500 text-xs sm:text-sm font-medium">
          Loading
        </span>
      </div>
    </div>
  );
}

export default MapSkeleton;
