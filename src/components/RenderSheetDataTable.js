import React, { useState, useEffect } from "react";

const RenderSheetDataTable = ({ sheetData }) => {
  if (!sheetData || sheetData.length === 0) return <div className="text-center p-4">Loading...</div>;

  const [filteredData, setFilteredData] = useState(sheetData);
  const [filterCriteria, setFilterCriteria] = useState("");

  // Defining filter options
  const filterOptions = ['Central', 'South', 'East', 'West'];

  // Use the first row of sheetData to determine headers
  const headers = Object.keys(sheetData[0]);

  useEffect(() => {
    if (filterCriteria) {
      // Filter the data based on the selected location
      const filtered = sheetData.filter(row => row.Location === filterCriteria);
      setFilteredData(filtered);
    } else {
      // If no filter criteria is selected, show all data
      setFilteredData(sheetData);
    }
  }, [sheetData, filterCriteria]); // Rerun when sheetData or filterCriteria changes

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style={{ height: "70vh" }}>
      <div className="flex justify-between items-center p-4">
        <label htmlFor="filterCriteria" className="block text-gray-700 text-sm font-bold mb-2">Filter by Location: </label>
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

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenderSheetDataTable;