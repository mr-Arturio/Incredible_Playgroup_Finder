"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Language } from "../types";

interface LanguageContextType {
  translation: Language;
  toggleTranslation: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [translation, setTranslation] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      // Check URL pathname for initial language setting
      if (pathname.startsWith("/fr")) return Language.FRENCH;
      if (pathname.startsWith("/en")) return Language.ENGLISH;
      // Fallback to localStorage if no URL parameter
      const savedLanguage = localStorage.getItem("language") as Language;
      return savedLanguage || Language.ENGLISH;
    }
    return Language.ENGLISH; // Default for SSR (server-side rendering)
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If no language in URL, redirect to saved language in localStorage or default to /en
      // But exclude dashboard routes from language-based routing
      if (
        !pathname.startsWith("/fr") &&
        !pathname.startsWith("/en") &&
        !pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/login")
      ) {
        const savedLanguage =
          (localStorage.getItem("language") as Language) || Language.ENGLISH;
        router.replace(`/${savedLanguage}`);
      }
      // Update localStorage when translation changes
      localStorage.setItem("language", translation);
    }
  }, [translation, pathname, router]);

  const toggleTranslation = (lang: Language): void => {
    setTranslation(lang);
  };

  return (
    <LanguageContext.Provider value={{ translation, toggleTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};
