import React, { useState, useEffect } from "react";
import PlaygroupCard from "./PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import FilterComponent from "./FilterComponent";

const RenderSheetDataTable = ({ sheetData }) => {
  if (!sheetData || sheetData.length === 0)
    return <div className="text-center p-4">Loading...</div>;

  const [filteredData, setFilteredData] = useState(sheetData);
  const [filterCriteria, setFilterCriteria] = useState({
    location: "",
    language: "",
    day: "",
    name: "",
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [dayOptions, setDayOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
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

    setDayOptions([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
    setLocationOptions([...uniqueLocations]);
    setLanguageOptions([...uniqueLanguages]);
    setNameOptions([...uniqueNames]);

    // Apply filtering based on location
    let filtered = applyFilters(sheetData, filterCriteria);
    setFilteredData(filtered);
  }, [sheetData, filterCriteria]);

  const handleFilterChange = (key, value) => {
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  return (
    <div
      className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
      style={{ height: "80vh" }}
    >
      <div className="sticky top-0 bg-white z-10 p-4">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
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
      <div className="mt-12">
        {filteredData.map((playgroup) => (
          <PlaygroupCard key={playgroup.id} playgroup={playgroup} />
        ))}
      </div>
    </div>
  );
};

export default RenderSheetDataTable;
