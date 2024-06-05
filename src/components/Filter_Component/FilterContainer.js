import React from "react";
import FilterComponent from "./FilterComponent";
import DatePickerComponent from "./DatePickerComponent";
import ResetFiltersButton from "./ResetFiltersButton";

const FilterContainer = ({
  filterCriteria,
  setFilterCriteria,
  handleFilterChange,
  locationOptions,
  ageOptions,
  languageOptions,
  dayOptions,
  timeOptions,
  nameOptions,
  handleDateChange,
  setStartDate,
  resetFilters,
}) => (
  <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
      {/* Filters */}
      <FilterComponent
        id="locationCriteria"
        value={filterCriteria.location}
        options={locationOptions}
        onChange={(e) => handleFilterChange("location", e.target.value)}
        placeholder="Location"
      />
      <FilterComponent
        id="ageCriteria"
        value={filterCriteria.age}
        options={ageOptions}
        onChange={(e) => handleFilterChange("age", e.target.value)}
        placeholder="Age Group"
      />
      <FilterComponent
        id="languageCriteria"
        value={filterCriteria.language}
        options={languageOptions}
        onChange={(e) => handleFilterChange("language", e.target.value)}
        placeholder="Language"
      />
      <FilterComponent
        id="dayCriteria"
        value={filterCriteria.day}
        options={dayOptions}
        onChange={(e) => handleFilterChange("day", e.target.value)}
        placeholder="Day of the Week"
      />
      <FilterComponent
        id="timeCriteria"
        value={filterCriteria.time}
        options={timeOptions}
        onChange={(e) => handleFilterChange("time", e.target.value)}
        placeholder="Time of the Day"
      />
      <FilterComponent
        id="nameCriteria"
        value={filterCriteria.name}
        options={nameOptions}
        onChange={(e) => handleFilterChange("name", e.target.value)}
        placeholder="Facility"
      />
    </div>

    {/* Date picker and reset button */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-4 lg:mt-0">
      <div className="w-full lg:flex lg:items-center">
        <DatePickerComponent
          onDateChange={(date) =>
            handleDateChange(
              date,
              setStartDate,
              setFilterCriteria,
              filterCriteria
            )
          }
        />
      </div>
      <ResetFiltersButton resetFilters={resetFilters} />
    </div>
  </>
);

export default FilterContainer;
