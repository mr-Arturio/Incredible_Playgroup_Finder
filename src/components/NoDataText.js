import React from 'react';

const NoDataText = () => {
  return (
    <div className="flex justify-center items-center h-full">
    <span className="text-gray-500 text-center">
      No data found for the selected filters. Please adjust your
      search criteria.
    </span>
  </div>
  );
}

export default NoDataText;