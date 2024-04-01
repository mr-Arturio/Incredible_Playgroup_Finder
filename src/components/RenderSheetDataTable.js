import React, { useState, useEffect } from "react";
import PlaygroupCard from "./PlaygroupCard";
import applyFilters from "../utils/applyFilters";

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

  return (
    <div
      className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
      style={{ height: "70vh" }}
    >
      <div className="flex justify-between items-center p-4">
        {/* Facility Name filter select */}
        <select
          id="nameCriteria"
          value={filterCriteria.name}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, name: e.target.value })
          }
          className="form-select block w-full md:w-1/4 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 hover:border-gray-400"
        >
          <option value="">Select Facility</option>
          {nameOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Location filter select */}
        <select
          id="locationCriteria"
          value={filterCriteria.location}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, location: e.target.value })
          }
          className="form-select block w-full md:w-1/4 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 hover:border-gray-400"
        >
          <option value="">Select Location</option>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Language filter select */}
        <select
          id="languageCriteria"
          value={filterCriteria.language}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, language: e.target.value })
          }
          className="form-select block w-full md:w-1/4 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 hover:border-gray-400"
        >
          <option value="">Select Language</option>
          {languageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Day of the week filter select */}
        <select
          id="dayCriteria"
          value={filterCriteria.day}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, day: e.target.value })
          }
          className="form-select block w-full md:w-1/4 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700 hover:border-gray-400"
        >
          <option value="">Select Day of the Week</option>
          {dayOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {filteredData.map((playgroup) => (
        <PlaygroupCard key={playgroup.id} playgroup={playgroup} />
      ))}
    </div>
  );
};

export default RenderSheetDataTable;
