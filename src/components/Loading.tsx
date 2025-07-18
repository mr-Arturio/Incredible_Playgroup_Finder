import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      <div className="mt-4 text-gray-500">Loading...</div>
    </div>
  );
};

export default Loading;
