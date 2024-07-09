import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../app/i18n";


async function Navbar({ lng }){
  const { t } = await useTranslation(lng);
  return (
    <nav className="bg-plum text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          {/* Assuming you have a logo.png in your public folder */}
          <Image
            src="/Play_Goup.png"
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <h1 className="text-xl md:text-4xl font-bold text-center mt-4 mr-1">
          {t("welcome")}
        </h1>
        <div>
        <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
