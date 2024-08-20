import "../../app/fonts.css";
import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect } from "react";
import RandomImage from "../../utils/RandomImage";
import { gradients } from "../../utils/gradient";
import CarSlider from "./CarSlider";
import NavBar from "./NavBar";

const Header = () => {
  const { translation } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [position, setPosition] = useState(0);

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

  const handleSliderChange = (event) => {
    const newPosition = event.target.value;
    setPosition(Number(newPosition));
  };

  // Calculate gradient index based on position
  const gradientIndex = Math.floor((position / 100) * (gradients.length - 1));

  // Translations
  const translations = {
    header: {
      en: {
        firstLine: "THE INCREDIBLE",
        secondLine: "PLAYGROUP FINDER!",
      },
      fr: {
        firstLine: " L'OUTILL",
        secondLine: "INCROYABLE!",
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
      <div
        className={`${gradients[gradientIndex]} transition-all ease-in-out duration-500 text-white`}
      >
        <div className="bg-frame">
          <div className="container mx-auto flex justify-between items-center">
            <div
              className="flex-1 text-left ml-2 lg:ml-40"
              style={{ flexBasis: "65%" }}
            >
              <h1 className="lg:ml-6 ml-10 text-2xl/5 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
                {translations.header[translation].firstLine}
              </h1>
              <h1 className="lg:ml-0 ml-6 text-lg 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
                {translations.header[translation].secondLine}
              </h1>
              <h3 className="hidden md:flex lg:ml-6 italic ml-3 md:ml-10  lg:text-xl md:text-base">
                {translations.under}
              </h3>
            </div>
            <div
              className="flex justify-end items-end ml-4"
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
