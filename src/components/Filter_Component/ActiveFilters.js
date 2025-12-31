const ActiveFilters = ({ filterCriteria, handleFilterChange, translation }) => {
  const filters = Object.keys(filterCriteria).filter((key) => {
    const value = filterCriteria[key];
    // Include non-empty strings and true booleans
    return value !== "" && value !== false;
  });

  if (filters.length === 0) return null;

  const dayMapping = {
    Mon: "Lun",
    Tue: "Mar",
    Wed: "Mer",
    Thur: "Jeu",
    Fri: "Ven",
    Sat: "Sam",
    Sun: "Dim"
  };

  const getTranslatedFilterValue = (filterKey, filterValue) => {
    // Handle showActiveOnly boolean filter
    if (filterKey === "showActiveOnly" && filterValue === true) {
      return translation === "fr"
        ? "Actifs Uniquement"
        : "Active Only";
    }

    // Handle day mapping
    if (translation === "fr" && dayMapping[filterValue]) {
      return dayMapping[filterValue];
    }

    return filterValue;
  };

  const handleRemoveFilter = (filterKey) => {
    // For boolean filters, set to false; for string filters, set to empty string
    if (filterKey === "showActiveOnly") {
      handleFilterChange(filterKey, false);
    } else {
      handleFilterChange(filterKey, "");
    }
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
            {getTranslatedFilterValue(filter, filterCriteria[filter])}
          </span>
          <button
            className="ml-1 text-red-500 hover:text-red-700"
            onClick={() => handleRemoveFilter(filter)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
