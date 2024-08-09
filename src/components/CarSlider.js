"use client";

import Image from "next/image";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const CarSlider = ({ position, handleSliderChange }) => {
  const { width, height } = useWindowSize();
  const celebrate = position >= 100;

  const calculateValue = (pos) => {
    return Math.round(pos);
  };

  return (
    <>
      {celebrate && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={650}
          gravity={0.03}
          recycle={false}
        />
      )}
      <div className="flex flex-col items-center bg-gray-100">
        {/* Slider */}
        <div className="relative w-full h-10 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-b-lg">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-500 transform -translate-y-1/2" />

          {/* Finish Pin Icon */}
          <div className="absolute -right-3 transform -translate-y-1/2 -rotate-45">
            <Image src="/IPFicon.svg" alt="Finish Pin" width={75} height={70} />
          </div>

          {/* Traditional Input Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={handleSliderChange}
            className="absolute top-1/2 left-0 right-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* Car Icon */}
          <div
            className="absolute -top-3 left-0 transform -translate-y-1/2 pointer-events-none"
            style={{ transform: `translateX(${(position / 100) * 93}vw)` }} // use vw to match w-screen
          >
            <Image src="/car.svg" alt="Car" width={100} height={100} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSlider;
