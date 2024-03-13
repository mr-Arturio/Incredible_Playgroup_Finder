import React from 'react';

const RenderSheetDataTable = ({ sheetData }) => {
  if (!sheetData) return <p>No data available</p>;

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Your Column Header
          </th>
          {/* Add more <th> tags here for additional columns */}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
          {sheetData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
  );
};

export default RenderSheetDataTable;
