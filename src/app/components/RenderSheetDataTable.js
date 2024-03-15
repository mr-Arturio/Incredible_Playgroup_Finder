import React from 'react';

const RenderSheetDataTable = ({ sheetData }) => {
  if (!sheetData || sheetData.length === 0) return <p>No data available</p>;

  // Use the first row of sheetData as headers
  const headers = Object.keys(sheetData[0]);

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sheetData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RenderSheetDataTable;