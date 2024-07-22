import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import '../app/fonts.css';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set client-side flag after component mounts
  }, []);

  // Translations
  const translations = {
    header: {
      en: "Welcome to THE INCREDIBLE PLAYGROUP FINDER!",
      fr: "Bienvenue dans L'INCROYABLE RECHERCHE DE GROUPES DE JEU !"
    }
  };

  // Render a loading state until client-side hydration is complete
  if (!isClient) {
    return <nav className="bg-plum text-white py-2"><div className="container mx-auto flex justify-between items-center">Loading...</div></nav>;
  }

  return (
    <nav className="bg-plum text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <Image
            src="/Play_Goup.png"
            alt="Logo"
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
        <div className="text-xl md:text-5xl text-center mt-4 mr-4 font-lazydog">
          <h1>{translations.header[language]}</h1>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
