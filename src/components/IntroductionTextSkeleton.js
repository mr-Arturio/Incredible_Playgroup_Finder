import React from "react";

function IntroductionTextSkeleton() {
  return (
    <>
      <div className="relative mr-2 sm:mr-2.5">
        <div
          className="h-8 w-16 sm:h-9 sm:w-20 md:w-20 bg-gray-200 rounded animate-pulse shrink-0"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col items-center m-1.5 sm:m-2 justify-between bg-cardBody/75 rounded-lg min-w-0 w-full max-w-full">
        <div className="mt-5 sm:mt-6 md:mt-8 md:p-5 md:pl-5 pt-2 px-2.5 sm:px-3 md:px-5 mb-1 md:mb-3 w-full max-w-full">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 inline-flex items-baseline">
            Loading
            <span className="inline-flex ml-0.5" aria-hidden="true">
              <span className="animate-loading-dot">.</span>
              <span className="animate-loading-dot">.</span>
              <span className="animate-loading-dot">.</span>
            </span>
          </p>
          {/* Title line */}
          <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-3/4 max-w-[12rem] sm:max-w-xs mb-2 sm:mb-3 animate-pulse" />
          {/* Paragraph lines */}
          <div className="space-y-1.5 sm:space-y-2 w-full">
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-full max-w-full animate-pulse" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-full max-w-full animate-pulse" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/5 max-w-full animate-pulse" />
          </div>
          {/* Read More button */}
          <div className="flex items-center justify-between flex-wrap gap-y-2 mt-3 sm:mt-4 pb-1 w-full">
            <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroductionTextSkeleton;
