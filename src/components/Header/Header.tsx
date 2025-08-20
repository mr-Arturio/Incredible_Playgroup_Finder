import React, { useState, useEffect, ChangeEvent } from "react";
import "../../app/fonts.css";
import { useLanguage } from "../../context/LanguageContext";
import RandomImage from "../../utils/RandomImage";
import CarSlider from "./CarSlider";
import NavBar from "./NavBar";

const Header: React.FC = () => {
  const { translation } = useLanguage();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  // Render a loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <nav className="bg-plum text-white py-2 min-h-[200px] flex justify-center items-center">
        <span>Loading...</span>
      </nav>
    );
  }

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPosition = event.target.value;
    setPosition(Number(newPosition));
  };

  // Compute smooth gradient stop positions based on slider position (0-100)
  const t = position / 100;
  const fromStop = 5 + 30 * t; // 5% -> 35%
  const viaStop1 = 20 + 25 * t; // 20% -> 45%
  const viaStop2 = viaStop1 + 10; // plateau width ~10%
  const toStop = 95 - 10 * t; // 95% -> 85%
  const gradientBackground = `linear-gradient(to right, #6366f1 0%, #6366f1 ${fromStop}%, #0ea5e9 ${viaStop1}%, #0ea5e9 ${viaStop2}%, #8b2fc9 ${toStop}%, #8b2fc9 100%)`;
  const gradientStyle = {
    backgroundImage: gradientBackground,
    transition: "background-image 200ms ease-out",
  } as React.CSSProperties;

  // Translations
  const translations = {
    header: {
      en: {
        firstLine: "THE INCREDIBLE",
        secondLine: "PLAYGROUP FINDER!",
      },
      fr: {
        firstLine: " L'OUTIL",
        secondLine: "INCROYABLE !",
      },
    },
    under:
      translation === "en"
        ? "Discover the perfect EarlyON playgroup for your busy schedule."
        : "Découvrez votre groupe de jeu ONyVA idéal.",
  };

  return (
    <>
      <NavBar />
      <div className={"text-white"} style={gradientStyle}>
        <div className="bg-frame">
          <div className="container mx-auto flex justify-between items-center">
            <div
              className="flex-1 text-left ml-2 lg:ml-40"
              style={{ flexBasis: "65%" }}
            >
              <h1 className="lg:ml-0 ml-6 text-2xl/5 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
                {translations.header[translation].firstLine}
              </h1>
              <h1 className="lg:ml-0 ml-6 text-lg 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
                {translations.header[translation].secondLine}
              </h1>
              <h2 className="hidden md:flex lg:ml-6 italic ml-3 md:ml-10 lg:text-xl md:text-sm mt-1">
                {translations.under}
              </h2>
            </div>
            <div
              className="flex justify-end items-end ml-4 mr-2"
              style={{ flexBasis: "35%" }}
            >
              <RandomImage />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <CarSlider
          position={position}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </>
  );
};

export default Header;
