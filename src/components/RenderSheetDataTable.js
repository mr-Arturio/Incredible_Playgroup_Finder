import React, { useState, useEffect } from "react";
import PlaygroupCard from "./PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import FilterComponent from "./FilterComponent";
import MapComponent from "./MapComponent";
import Loading from "../app/loading";

const RenderSheetDataTable = ({ sheetData }) => {
  const isLoading = !sheetData || sheetData.length === 0;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filteredData, setFilteredData] = useState(sheetData || []);
  const [filterCriteria, setFilterCriteria] = useState({
    location: "",
    language: "",
    day: "",
    name: "",
    age: "",
    time: "",
  });
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
    setSelectedAddress(Address);
  };

  //Reset Function
  const resetFilters = () => {
    setSelectedAddress(null);
    setFilterCriteria({
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
      // Extract unique locations from sheetData
      const uniqueLocations = new Set(
        sheetData.map((item) => item.Location).filter(Boolean)
      );
      const uniqueLanguages = new Set(
        sheetData.map((item) => item.Language).filter(Boolean)
      );
      const uniqueNames = new Set(
        sheetData.map((item) => item.Name).filter(Boolean)
      );

      setLocationOptions([...uniqueLocations]);
      setLanguageOptions([...uniqueLanguages]);
      setNameOptions([...uniqueNames]);

      // Apply filtering based on location
      let filtered = applyFilters(sheetData, filterCriteria) || [];
      setFilteredData(filtered);
    }
  }, [sheetData, filterCriteria, isLoading]);

  if (isLoading) return <Loading />;
  //check for no data available
  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  return (
    <div className="flex flex-col md:flex-col">
      {/* Filter Components */}
      <div className="sticky top-0 bg-white z-10 p-4 w-full">
        <div className="flex flex-wrap justify-between items-center">
          <FilterComponent
            id="locationCriteria"
            value={filterCriteria.location}
            options={locationOptions}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Select Location"
          />
          <FilterComponent
            id="ageCriteria"
            value={filterCriteria.age}
            options={ageOptions}
            onChange={(e) => handleFilterChange("age", e.target.value)}
            placeholder="Select Age Group"
          />

          <FilterComponent
            id="languageCriteria"
            value={filterCriteria.language}
            options={languageOptions}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            placeholder="Select Language"
          />

          <FilterComponent
            id="dayCriteria"
            value={filterCriteria.day}
            options={dayOptions}
            onChange={(e) => handleFilterChange("day", e.target.value)}
            placeholder="Select Day of the Week"
          />

          <FilterComponent
            id="timeCriteria"
            value={filterCriteria.time}
            options={timeOptions}
            onChange={(e) => handleFilterChange("time", e.target.value)}
            placeholder="Select Time of the Day"
          />

          <FilterComponent
            id="nameCriteria"
            value={filterCriteria.name}
            options={nameOptions}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder="Select Facility"
          />
        </div>
        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Reset Filters
        </button>
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
                  .filter(
                    (playgroup) =>
                      selectedAddress === null ||
                      playgroup.Address === selectedAddress
                  )
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
