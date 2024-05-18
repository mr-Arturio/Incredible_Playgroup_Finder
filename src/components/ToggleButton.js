import React from "react";
import Image from "next/image";

const ToggleButton = ({ isToggled, onToggle, labels }) => {
  return (
    <button
      className="md:hidden p-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg flex items-center justify-center mt-5 "
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
