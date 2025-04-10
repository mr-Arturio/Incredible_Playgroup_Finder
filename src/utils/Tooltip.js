import React from "react";

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      {text && (
        <div className="absolute bottom-full mb-1.5 -ml-5 px-1.5 py-1 bg-black text-white text-xs rounded-md z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
