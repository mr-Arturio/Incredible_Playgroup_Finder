import FilterComponent from "./FilterComponent";
import DatePickerComponent from "./DatePickerComponent";
import ResetFiltersButton from "./ResetFiltersButton";
import ActiveFilters from "./ActiveFilters";
import { useLanguage } from "../../context/LanguageContext";

const FilterContainer = ({
  filterCriteria,
  setFilterCriteria,
  handleFilterChange,
  areaOptions,
  ageOptions,
  languageOptions,
  dayOptions,
  timeOptions,
  locationOptions,
  handleDateChange,
  setStartDate,
  resetFilters,
  dayMapping,
}) => {
  const { language } = useLanguage();

  const hasActiveFilters = Object.values(filterCriteria).some(
    (value) => value !== ""
  );

  return (
    <div className="flex flex-col py-3 px-5 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow mb-4 w-full">
      <div className="flex flex-col space-y-0 lg:space-y-0 lg:flex-1 mr-4">
        {/* First row of filters */}
        <div className="md:flex justify-between gap-2 lg:mb-3">
          <FilterComponent
            id="areaCriteria"
            className="flex-grow"
            value={filterCriteria.area}
            options={areaOptions}
            onChange={(e) => handleFilterChange("area", e.target.value)}
            placeholder={language === "fr" ? "Zone" : "Area"}
          />
          <FilterComponent
            id="ageCriteria"
            className="flex-grow"
            value={filterCriteria.age}
            options={ageOptions}
            onChange={(e) => handleFilterChange("age", e.target.value)}
            placeholder={language === "fr" ? "Groupe d'âge" : "Age Group"}
          />
          <FilterComponent
            id="languageCriteria"
            className="flex-grow"
            value={filterCriteria.language}
            options={languageOptions}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            placeholder={language === "fr" ? "Langue" : "Language"}
          />
        </div>
        {/* Second row of filters */}
        <div className="md:flex justify-between gap-2 mb-3">
          <FilterComponent
            id="dayCriteria"
            value={filterCriteria.day}
            options={dayOptions}
            onChange={(e) => handleFilterChange("day", e.target.value)}
            placeholder={
              language === "fr" ? "Jour de la semaine" : "Day of the Week"
            }
            mapping={dayMapping}
          />
          <FilterComponent
            id="timeCriteria"
            value={filterCriteria.time}
            options={timeOptions}
            onChange={(e) => handleFilterChange("time", e.target.value)}
            placeholder={
              language === "fr" ? "Moment de la journée" : "Time of the Day"
            }
          />
          <FilterComponent
            id="locationCriteria"
            value={filterCriteria.location}
            options={locationOptions}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder={language === "fr" ? "Lieu" : "Location"}
          />
        </div>
        {/* Third row for active filters */}
        <div className="lg:flex hidden justify-between gap-2 mb-4">
          <ActiveFilters
            filterCriteria={filterCriteria}
            handleFilterChange={handleFilterChange}
            language={language}
          />
        </div>
      </div>
      {/* Date picker and reset button */}
      <div
        className={`flex flex-row lg:space-x-4 ${
          hasActiveFilters ? "lg:items-start" : "lg:items-middle"
        }`}
      >
        <div
          className={`w-full h-full lg:flex ${
            hasActiveFilters ? "lg:items-start" : "lg:items-middle"
          }`}
        >
          <DatePickerComponent
            language={language}
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
          <ResetFiltersButton resetFilters={resetFilters} language={language}/>
        </div>
      </div>
      {/* Third row for active filters */}
      <div className="lg:hidden flex justify-between gap-2 mb-4">
        <ActiveFilters
          filterCriteria={filterCriteria}
          handleFilterChange={handleFilterChange}
          language={language}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
