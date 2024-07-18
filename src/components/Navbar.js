import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import '../app/fonts.css';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language } = useLanguage();

  const translations = {
    header: language === "fr" ? (
      <h1>Bienvenue dans L'INCROYABLE RECHERCHE DE GROUPES DE JEU !</h1>
    ) : (
      <h1>Welcome to THE INCREDIBLE PLAYGROUP FINDER!</h1>
    ),
  };

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
          {translations.header}
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;