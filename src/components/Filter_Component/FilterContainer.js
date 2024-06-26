import FilterComponent from "./FilterComponent";
import DatePickerComponent from "./DatePickerComponent";
import ResetFiltersButton from "./ResetFiltersButton";
import ActiveFilters from "./ActiveFilters";

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
}) => {
  const hasActiveFilters = Object.values(filterCriteria).some(
    (value) => value !== ""
  );

  return (
    <>
      <div className="flex flex-col space-y-0 lg:space-y-0 lg:flex-1 mr-4">
        {/* First row of filters */}
        <div className="md:flex justify-between gap-2 lg:mb-3">
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
        <div className="md:flex justify-between gap-2 mb-3">
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
        {/* Third row for active filters */}
        <div className="md:flex justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <ActiveFilters
              filterCriteria={filterCriteria}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      {/* Date picker and reset button */}
      <div
        className={`flex flex-col lg:flex-row lg:space-x-4 ${
          hasActiveFilters ? "lg:items-start" : "lg:items-middle"
        }`}
      >
        <div
          className={`w-full h-full lg:flex ${
            hasActiveFilters ? "lg:items-start" : "lg:items-middle"
          }`}
        >
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
        <div className="relative w-full flex flex-col items-center">
          <ResetFiltersButton resetFilters={resetFilters} />
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
