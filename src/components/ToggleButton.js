import React from "react";
import Image from "next/image";

const ToggleButton = ({ isToggled, onToggle, labels, className = "" }) => {
  return (
    <button
      className={`p-2 text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center mb-4 ${className}`}
      onClick={onToggle}
    >
      {isToggled ? (
        <>
          <Image
            src="doubleArrowUp.svg"
            alt="Show"
            width={17}
            height={17}
            className="mr-5"
          />
          {labels.toggledOn}
          <Image
            src="doubleArrowUp.svg"
            alt="Show"
            width={17}
            height={17}
            className="ml-5"
          />
        </>
      ) : (
        <>
          <Image
            src="double_arrow.svg"
            alt="Show Less"
            width={17}
            height={17}
            className="mr-5"
          />
          {labels.toggledOff}
          <Image
            src="double_arrow.svg"
            alt="Show Less"
            width={17}
            height={17}
            className="ml-5"
          />
        </>
      )}
    </button>
  );
};

export default ToggleButton;
