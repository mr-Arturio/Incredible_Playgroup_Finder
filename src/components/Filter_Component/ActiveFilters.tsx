import React from "react";
import { Language, FilterCriteria } from "../../types";

interface ActiveFiltersProps {
  filterCriteria: FilterCriteria;
  handleFilterChange: (key: keyof FilterCriteria, value: string) => void;
  translation: Language;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filterCriteria,
  handleFilterChange,
  translation,
}) => {
  const filters = Object.keys(filterCriteria).filter(
    (key) => filterCriteria[key as keyof FilterCriteria] !== ""
  );

  if (filters.length === 0) return null;

  const dayMapping: Record<string, string> = {
    Mon: "Lun",
    Tue: "Mar",
    Wed: "Mer",
    Thur: "Jeu",
    Fri: "Ven",
    Sat: "Sam",
    Sun: "Dim",
  };

  const getTranslatedFilterValue = (filterValue: string): string => {
    if (translation === "fr" && dayMapping[filterValue]) {
      return dayMapping[filterValue];
    }
    return filterValue;
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="font-bold">
        {translation === "fr" ? "Filtres Actifs:" : "Active Filters:"}
      </span>
      {filters.map((filter) => (
        <div
          key={filter}
          className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
        >
          <span>
            {getTranslatedFilterValue(
              filterCriteria[filter as keyof FilterCriteria]
            )}
          </span>
          <button
            className="ml-1 text-red-500 hover:text-red-700"
            onClick={() =>
              handleFilterChange(filter as keyof FilterCriteria, "")
            }
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
