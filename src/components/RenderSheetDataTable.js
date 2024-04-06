import React, { useState, useEffect } from "react";
import PlaygroupCard from "./PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import FilterComponent from "./FilterComponent";
import MapComponent from "./MapComponent";

const RenderSheetDataTable = ({ sheetData }) => {
  const isLoading = !sheetData || sheetData.length === 0;

  const [filteredData, setFilteredData] = useState(sheetData || []);
  const [filterCriteria, setFilterCriteria] = useState({
    location: "",
    language: "",
    day: "",
    name: "",
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [dayOptions, setDayOptions] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

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

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  const handleFilterChange = (key, value) => {
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  return (
    <div className="flex flex-col md:flex-col">
      {/* Filter Components */}
      <div className="sticky top-0 bg-white z-10 p-4 w-full">
        <div className="flex flex-wrap justify-between items-center">
          <FilterComponent
            id="nameCriteria"
            value={filterCriteria.name}
            options={nameOptions}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder="Select Facility"
          />

          <FilterComponent
            id="locationCriteria"
            value={filterCriteria.location}
            options={locationOptions}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Select Location"
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
            <div className="mt-12">
              {filteredData.map((playgroup) => (
                <PlaygroupCard key={playgroup.id} playgroup={playgroup} />
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-2/5">
          <MapComponent sheetData={sheetData} />
        </div>
      </div>
    </div>
  );
};

export default RenderSheetDataTable;
