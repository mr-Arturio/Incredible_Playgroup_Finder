import React from "react";

const ResetFiltersButton = ({ resetFilters }) => {
  return (
    <button
    onClick={resetFilters}
    className="mt-4 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-full lg:w-auto"
  >
    Reset Filters
  </button>
  )
}

export default ResetFiltersButton;