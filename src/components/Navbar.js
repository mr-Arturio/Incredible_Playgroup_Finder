import Image from "next/image";
// import LanguageSwitcher from "./LanguageSwitcher";
import "../app/fonts.css";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { translation } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  // Translations
  const translations = {
    header: {
      en: "INCREDIBLE PLAYGROUP FINDER!",
      fr: "INCROYABLE RECHERCHE DE GROUPES DE JEU!",
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
    <nav className="bg-gradient-to-r from-gradient1  to-gradient2 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center ml-2">
          <h1 className="lg:ml-10 text-3xl 2xl:text-7xl lg:text-6xl md:text-5xl font-lazydog">
            {translations.header[translation]}
          </h1>
        </div>
        <div className="shrink ml-4">
          <Image
            src="/IPFicon.svg"
            alt="Logo"
            width={170}
            height={170}
                />
        </div>
      </div>
      {/* <LanguageSwitcher /> */}
    </nav>
  );
};

export default Navbar;
