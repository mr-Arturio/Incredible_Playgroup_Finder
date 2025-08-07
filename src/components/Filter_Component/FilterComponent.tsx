import React, { ChangeEvent } from "react";
import { Language } from "../../types";

interface FilterComponentProps {
  id: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  mapping?: Record<string, string>;
  translation: Language;
  className?: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  id,
  value,
  options,
  onChange,
  placeholder,
  mapping,
  translation,
  className = "",
}) => {
  return (
    <div className={`w-full lg:w-3/12 px-1 mb-2 lg:mb-0 ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full py-2 pl-3 pr-10 text-gray-700 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition ease-in-out duration-150"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E") no-repeat right 10px center`,
          backgroundSize: "1rem 1rem",
        }}
      >
        {/* Show "Show all" option when something is selected */}
        {value && (
          <option value="" className="font-bold">
            {translation === "fr" ? "Afficher tout" : "Show all"}
          </option>
        )}
        {/* Placeholder as the first option */}
        {!value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {/* Map through the options passed to the component */}
        {options.map((option) => (
          <option key={option} value={option}>
            {mapping ? mapping[option] : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
