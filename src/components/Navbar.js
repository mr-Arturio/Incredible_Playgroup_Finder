"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../app/i18n/client";
import { useEffect, useState } from "react";

function Navbar({ lng }) {
  const { t, i18n } = useTranslation(lng);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const changeLanguage = async () => {
      await i18n.changeLanguage(lng);
      setLoading(false);
    };
    changeLanguage();
  }, [lng, i18n]);

  if (loading) return null;

  return (
    <nav className="bg-plum text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
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
}

export default Navbar;
