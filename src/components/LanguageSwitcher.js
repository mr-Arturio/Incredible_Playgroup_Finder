"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { translation, toggleTranslation } = useLanguage();
  const [clientLanguage, setClientLanguage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setClientLanguage(translation);
    // console.log("Language updated in useEffect:", translation);
  }, [translation]);

  const handleLanguageChange = (lang) => {
    console.log("Language change initiated:", lang);
    toggleTranslation(lang);
    localStorage.setItem("language", lang); // Persist change in localStorage immediately

    if (lang === "fr") {
      router.push("/fr");
    } else {
      router.push("/");
    }
    console.log("Router pushed to:", lang === "fr" ? "/fr" : "/");
  };

  if (clientLanguage === null) return null;

  return (
    <div className="absolute top-0 right-0 flex z-10">
      <button
        className={`px-1 py-1 text-sm md:text-base md:px-3 md:py-1 rounded-bl-lg shadow-lg hover:shadow-xl ease-in-out  transition-colors duration-300 ${
          clientLanguage === "en"
            ? "bg-amber text-white"
            : "bg-gray-200 text-gray-500"
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        <p className="duration-200 ease-in-out transform hover:scale-110">EN</p>
      </button>
      <button
        className={`px-1 py-1 text-sm md:text-base md:px-3 md:py-1 rounded-br-lg shadow-lg hover:shadow-xl ease-in-out  transition-colors duration-300 ${
          clientLanguage === "fr"
            ? "bg-amber text-white"
            : "bg-gray-200 text-gray-500"
        }`}
        onClick={() => handleLanguageChange("fr")}
      >
        <p className="duration-200 ease-in-out transform hover:scale-110">FR</p>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
