import React from "react";
import Image from "next/image";

const ToggleButton = ({ isToggled, onToggle, labels, className = "" }) => {
  return (
    <button
      className={`p-1 mx-2.5 text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center shadow-md hover:shadow-xl transition duration-200 ease-in-out mb-4 ${className}`}
      onClick={onToggle}
    >
      {isToggled ? (
        <>
          <Image
            src="doubleArrowUp.svg"
            alt="Show Less"
            width={16}
            height={16}
            className="mr-5 h-3 w-3"
          />
          {labels.toggledOn}
          <Image
            src="doubleArrowUp.svg"
            alt="Show Less"
            width={16}
            height={16}
            className="ml-5 h-3 w-3"
          />
        </>
      ) : (
        <>
          <Image
            src="double_arrow.svg"
            alt="Show"
            width={16}
            height={16}
            className="mr-4 h-3 w-3 "
          />
          {labels.toggledOff}
          <Image
            src="double_arrow.svg"
            alt="Show"
            width={16}
            height={16}
            className="ml-4 h-3 w-3 "
          />
        </>
      )}
    </button>
  );
};

export default ToggleButton;
