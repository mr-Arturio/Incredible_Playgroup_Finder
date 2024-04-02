import React from "react";

const FilterComponent = ({ id, value, options, onChange, placeholder }) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    className="form-select block w-full md:w-1/4 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 hover:border-gray-400"
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default FilterComponent;
