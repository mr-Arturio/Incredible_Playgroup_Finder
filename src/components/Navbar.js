import Image from "next/image";
import "../app/fonts.css";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";
import RandomImage from "../utils/RandomImage";

const Navbar = () => {
  const { translation } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [gradient, setGradient] = useState({
    from: "from-gradient1",
    via: "via-gradient2",
    to: "to-gradient3",
  });
  const [gradientPos, setGradientPos] = useState(0);

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  // Translations
  const translations = {
    header: {
      en: {
        firstLine: "INCREDIBLE",
        secondLine: "PLAYGROUP FINDER!",
      },
      fr: {
        firstLine: "INCROYABLE",
        secondLine: "RECHERCHE DE GROUPES DE JEU!",
      },
    },
    under:
      translation === "en"
        ? "Discover the perfect EarlyON playgroup for your busy schedule."
        : "Découvrez le groupe de jeu EarlyON idéal pour votre emploi du temps chargé.",
  };

  // Render a loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <nav className="bg-plum text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          Loading...
        </div>
      </nav>
    );
  }

  // Handle slider change
  const handleSliderChange = (event) => {
    const value = event.target.value;
    const gradients = [
      { from: "from-blue-500", via: "via-green-500", to: "to-yellow-500" },
      { from: "from-blue-600", via: "via-teal-500", to: "to-purple-500" },
      { from: "from-cyan-500", via: "via-blue-500", to: "to-indigo-500" },
      { from: "from-purple-500", via: "via-pink-500", to: "to-red-500" },
      { from: "from-pink-500", via: "via-orange-500", to: "to-yellow-500" },
      { from: "from-red-500", via: "via-orange-500", to: "to-yellow-500" },
      { from: "from-green-500", via: "via-blue-500", to: "to-indigo-500" },
      { from: "from-emerald-500", via: "via-teal-500", to: "to-blue-500" },
      { from: "from-yellow-500", via: "via-orange-500", to: "to-red-500" },
    ];
    const index = Math.floor((value / 100) * gradients.length);
    if (gradients[index]) {
      setGradient(gradients[index]);
    } else {
      // Default gradient if index is out of range
      setGradient(gradients[0]);
    }
    setGradientPos(value); // Update the gradient position
  };

  return (
    <nav
      className={`bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to} text-white`}
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
            <h3 className="hidden md:flex lg:ml-6 italic ml-3 md:ml-10 lg:text-xl md:text-base">
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
        <div className="mt-4 mx-auto w-full flex justify-center items-center">
          <div className="relative w-full max-w-xl">
            <input
              type="range"
              min="0"
              max="100"
              value={gradientPos}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              onChange={handleSliderChange}
            />
            <div
              className="absolute top-0 h-full flex items-center justify-center transition-all duration-300 ease-in-out"
              style={{ left: `${gradientPos}%`, transform: "translateX(-50%)" }}
            >
              <Image src="/car.svg" alt="Car" width={60} height={60} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
