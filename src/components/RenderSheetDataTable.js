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
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    // Extract unique locations from sheetData
    const uniqueLocations = new Set(
      sheetData.map((item) => item.Location).filter(Boolean)
    );
    const uniqueLanguages = new Set(
      sheetData.map((item) => item.Language).filter(Boolean)
    );
    setLocationOptions([...uniqueLocations]);
    setLanguageOptions([...uniqueLanguages]);

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
        <label
          htmlFor="filterCriteria"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Filter by Location:{" "}
        </label>
        <select
          id="locationCriteria"
          value={filterCriteria.location}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, location: e.target.value })
          }
          className="form-select block w-full md:w-1/4 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4 md:mb-0 md:mr-4"
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
          className="form-select block w-full md:w-1/4 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select Language</option>
          {languageOptions.map((option) => (
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
