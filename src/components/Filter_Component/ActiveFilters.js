import React from "react";

const ActiveFilters = ({ filterCriteria, handleFilterChange }) => {
  const filters = Object.keys(filterCriteria).filter(
    (key) => filterCriteria[key]
  );

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="font-bold">Active Filters:</span>
      {filters.map((filter) => (
        <div
          key={filter}
          className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
        >
          <span>{filterCriteria[filter]}</span>
          <button
            className="ml-1 text-red-500 hover:text-red-700"
            onClick={() => handleFilterChange(filter, "")}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
