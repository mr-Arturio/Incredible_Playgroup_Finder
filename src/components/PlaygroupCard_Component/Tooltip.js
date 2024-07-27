//to display additional information in a small pop-up box when a user hovers over an element
import React from "react";

const Tooltip = ({ text, children }) => {
  // Only render the tooltip div if there is text
  return (
    <div className="relative">
      {children}
      {text && (
        <div className="absolute bottom-full mb-1.5 -ml-5 px-2 py-1 bg-black text-white text-xs rounded-md z-50 whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
