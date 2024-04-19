import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlaygroupCard from "./PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import FilterComponent from "./FilterComponent";
import MapComponent from "./MapComponent";
import Loading from "../app/loading";
import { handleDateChange } from "../utils/handleDateChange";
import DatePickerComponent from "./DatePickerComponent";

const RenderSheetDataTable = ({ sheetData }) => {
  const isLoading = !sheetData || sheetData.length === 0; //// Check if the data is still loading or empty

  // State declarations
  const [startDate, setStartDate] = useState(new Date()); // Handles the selected date for filtering
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks the selected address from map markers
  const [filteredData, setFilteredData] = useState(sheetData || []); // Stores the filtered data based on criteria
  const [filterCriteria, setFilterCriteria] = useState({
    // Stores the current filter settings
    date: "",
    location: "",
    language: "",
    day: "",
    name: "",
    age: "",
    time: "",
  });

  // State for filter options, extracted from sheet data
  const [locationOptions, setLocationOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([
    "Morning",
    "Afternoon",
    "Evening",
  ]);
  const [ageOptions, setAgeOptions] = useState(["Babies", "Toddlers", "Kids"]);
  const [dayOptions, setDayOptions] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const handleMarkerSelect = (Address) => {
    setSelectedAddress(Address); // Set the address when a map marker is selected
  };

  // Reset all filters to default states, including clearing selected markers
  const resetFilters = () => {
    setSelectedAddress(null);
    setStartDate(new Date()); // Reset the date picker to today's date
    setFilterCriteria({
      date: "",
      location: "",
      language: "",
      day: "",
      name: "",
      age: "",
      time: "",
    });
  };

  useEffect(() => {
    if (!isLoading) {
      // Extract all unique location, languge, facility from sheetData. If it's not in spreadsheet it will to be displayed in the filter
      setLocationOptions([
        ...new Set(sheetData.map((item) => item.Location).filter(Boolean)),
      ]);
      setLanguageOptions([
        ...new Set(sheetData.map((item) => item.Language).filter(Boolean)),
      ]);
      setNameOptions([
        ...new Set(sheetData.map((item) => item.Name).filter(Boolean)),
      ]);

      // Apply filters to the data
      let filtered = applyFilters(sheetData, filterCriteria, selectedAddress);

      // If a specific location is selected via marker, filter by that as well
      if (selectedAddress) {
        filtered = filtered.filter(
          (playgroup) => playgroup.Address === selectedAddress
        );
      }

      setFilteredData(filtered);
    }
  }, [sheetData, filterCriteria, isLoading, selectedAddress]);

  if (isLoading) return <Loading />;
  //check for no data available
  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    // Deselect marker when the name filter changes or when the location filter changes
    if (key === "name" || key === "location") {
      setSelectedAddress(null);
    }
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  return (
    <div className="flex flex-col md:flex-col">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 sticky top-0 bg-white z-10 p-4 w-full">
        {/* Filters container */}
        <div className="flex flex-col space-y-0 md:space-y-0 md:flex-1">
          {/* First row of filters */}
          <div className="flex justify-around gap-2 mb-4">
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
          </div>
          {/* Second row of filters */}
          <div className="flex justify-around gap-2 mb-4">
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
        </div>

        {/* Date picker and reset button */}
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
          <div className="w-full h-full md:flex md:items-center">
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
          <button
            onClick={resetFilters}
            className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-full md:w-auto"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex flex-1 md:flex-row">
        {/* Playgroup Cards Section */}
        <div className="w-full md:w-3/5 p-4">
          <div
            className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
            style={{ height: "80vh" }}
          >
            {noDataAvailable ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-gray-500 text-center">
                  No data found for the selected filters. Please adjust your
                  search criteria.
                </span>
              </div>
            ) : (
              <div className="mt-12">
                {filteredData
                  .filter((playgroup) => {
                    //additional logic to check that playgroup is not in the past
                    const playgroupDate = new Date(playgroup.Date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedAddress === null ||
                      (playgroup.Address === selectedAddress &&
                        playgroupDate >= today)
                    );
                  })
                  .map((playgroup) => (
                    <PlaygroupCard key={playgroup.ID} playgroup={playgroup} />
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-2/5">
          <MapComponent
            sheetData={filteredData}
            onMarkerSelect={handleMarkerSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderSheetDataTable;
