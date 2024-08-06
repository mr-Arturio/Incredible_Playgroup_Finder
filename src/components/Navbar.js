import Image from "next/image";
import "../app/fonts.css";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";
import RandomImage from "../utils/RandomImage";

const Navbar = () => {
  const { translation } = useLanguage();
  const [isClient, setIsClient] = useState(false);

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

  return (
    <nav className="bg-gradient-to-r from-gradient1 via-gradient2 to-gradient3 text-white pt-2 ">
      <div className="bg-frame">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1 text-left ml-2" style={{ flexBasis: "70%" }}>
            <h1 className="lg:ml-16 text-3xl 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
              {translations.header[translation].firstLine}
            </h1>
            <h1 className="lg:ml-12 text-xl 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
              {translations.header[translation].secondLine}
            </h1>
          </div>
          <div
            className="flex justify-end items-end ml-4"
            style={{ flexBasis: "30%" }}
          >
            <RandomImage />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
