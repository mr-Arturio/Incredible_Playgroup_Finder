import React from "react";

const ResetFiltersButton = ({ resetFilters }) => {
  return (
    <button
    onClick={resetFilters}
    className="mt-4 lg:mt-0 bg-mainBlue hover:bg-hoverBlue text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline h-full lg:w-auto"
  >
    Reset Filters
  </button>
  )
}

export default ResetFiltersButton;