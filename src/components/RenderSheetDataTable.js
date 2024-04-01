import React, { useState, useEffect } from "react";
import PlaygroupCard from "./PlaygroupCard";
import filterByLocation from "../utils/filtering/filterByLocation";

const RenderSheetDataTable = ({ sheetData }) => {
  if (!sheetData || sheetData.length === 0)
    return <div className="text-center p-4">Loading...</div>;

    const [filteredData, setFilteredData] = useState(sheetData);
    const [filterCriteria, setFilterCriteria] = useState("");
  
    // Defining filter options
    const filterOptions = ["Central", "South", "East", "West"];
  
    useEffect(() => {
      // Apply filtering based on location
      let filtered = filterByLocation(sheetData, filterCriteria);
  
      setFilteredData(filtered);
    }, [sheetData, filterCriteria]); // Rerun when sheetData or filterCriteria changes

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
          id="filterCriteria"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="form-select block w-1/4 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select Location</option>
          {filterOptions.map((option) => (
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
