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
  dayMapping,
}) => (
  <>
    <div className="flex flex-col space-y-0 lg:space-y-0 lg:flex-1 mr-4">
      {/* First row of filters */}
      <div className="md:flex justify-between gap-2 lg:mb-4">
        <FilterComponent
          id="locationCriteria"
          className="flex-grow"
          value={filterCriteria.location}
          options={locationOptions}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          placeholder="Location"
        />
        <FilterComponent
          id="ageCriteria"
          className="flex-grow"
          value={filterCriteria.age}
          options={ageOptions}
          onChange={(e) => handleFilterChange("age", e.target.value)}
          placeholder="Age Group"
        />
        <FilterComponent
          id="languageCriteria"
          className="flex-grow"
          value={filterCriteria.language}
          options={languageOptions}
          onChange={(e) => handleFilterChange("language", e.target.value)}
          placeholder="Language"
        />
      </div>
      {/* Second row of filters */}
      <div className="md:flex justify-between gap-2 mb-4">
        <FilterComponent
          id="dayCriteria"
          value={filterCriteria.day}
          options={dayOptions}
          onChange={(e) => handleFilterChange("day", e.target.value)}
          placeholder="Day of the Week"
          mapping={dayMapping}
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
    </div>
    {/* Date picker and reset button */}
    <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4">
      <div className="w-full h-full lg:flex lg:items-center">
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
      {/* Reset button to clear all selected filters */}
      <ResetFiltersButton resetFilters={resetFilters} />
    </div>
  </>
);

export default FilterContainer;
