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
  organizerOptions,
  handleDateChange,
  setStartDate,
  resetFilters,
  dayMapping,
  isFilterActive,
}) => {
  const { translation } = useLanguage();

  const hasActiveFilters = Object.values(filterCriteria).some(
    (value) => value !== ""
  );

  return (
    <div className="flex flex-col py-3 px-5 space-y-1 lg:flex-row lg:space-y-0 lg:space-x-4 bg-white rounded-lg md:rounded-t-lg md:rounded-b-none shadow mb-4 lg:mb-0 w-full border-b">
      <div className="flex flex-col space-y-0 lg:space-y-0 lg:flex-1 mr-4">
        {/* First row of filters */}
        <div className="md:flex justify-between gap-2 lg:mb-3">
          <FilterComponent
            translation={translation}
            id="dayCriteria"
            value={filterCriteria.day}
            options={dayOptions}
            onChange={(e) => handleFilterChange("day", e.target.value)}
            placeholder={
              translation === "fr" ? "Jour de la semaine" : "Day of Week"
            }
            mapping={dayMapping}
          />
          <FilterComponent
            translation={translation}
            id="timeCriteria"
            value={filterCriteria.time}
            options={timeOptions}
            onChange={(e) => handleFilterChange("time", e.target.value)}
            placeholder={
              translation === "fr" ? "Heure de la journée" : "Time of Day"
            }
          />
          <FilterComponent
            translation={translation}
            id="languageCriteria"
            className="flex-grow"
            value={filterCriteria.language}
            options={languageOptions}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            placeholder={translation === "fr" ? "Langue" : "Language"}
          />
        </div>
        {/* Second row of filters */}
        <div className="md:flex justify-between gap-2 mb-3">
          <FilterComponent
            translation={translation}
            id="areaCriteria"
            className="flex-grow"
            value={filterCriteria.area}
            options={areaOptions}
            onChange={(e) => handleFilterChange("area", e.target.value)}
            placeholder={
              translation === "fr" ? "Région d'Ottawa " : "Area of Ottawa"
            }
          />
          <FilterComponent
            translation={translation}
            id="ageCriteria"
            className="flex-grow"
            value={filterCriteria.age}
            options={ageOptions}
            onChange={(e) => handleFilterChange("age", e.target.value)}
            placeholder={translation === "fr" ? "Âge" : "Age"}
          />
          <FilterComponent
            translation={translation}
            id="organizerCriteria"
            value={filterCriteria.organizer}
            options={organizerOptions}
            onChange={(e) => handleFilterChange("organizer", e.target.value)}
            placeholder={
              translation === "fr" ? "Prestataire" : "Playgroup Provider"
            }
          />
        </div>
        {/* Third row for active filters */}
        <div className="lg:flex hidden justify-between">
          <ActiveFilters
            filterCriteria={filterCriteria}
            handleFilterChange={(key, val) =>
              setFilterCriteria((prev) => ({ ...prev, [key]: val }))
            }
            translation={translation}
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
            translation={translation}
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
          <ResetFiltersButton
            resetFilters={resetFilters}
            translation={translation}
            hasActiveFilters={hasActiveFilters || isFilterActive}
          />
        </div>
      </div>
      {/* Third row for active filters */}
      <div className="lg:hidden flex justify-between">
        <ActiveFilters
          filterCriteria={filterCriteria}
          handleFilterChange={(key, val) =>
            setFilterCriteria((prev) => ({ ...prev, [key]: val }))
          }
          translation={translation}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
