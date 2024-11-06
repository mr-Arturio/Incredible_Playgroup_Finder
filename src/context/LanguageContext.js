'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [translation, setTranslation] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check URL pathname for initial language setting
      if (pathname.startsWith('/fr')) return 'fr';
      if (pathname.startsWith('/en')) return 'en';
      // Fallback to localStorage if no URL parameter
      return localStorage.getItem('language') || 'en';
    }
    return 'en'; // Default for SSR (server-side rendering)
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If no language in URL, redirect to saved language in localStorage or default to /en
      if (!pathname.startsWith('/fr') && !pathname.startsWith('/en')) {
        const savedLanguage = localStorage.getItem('language') || 'en';
        router.replace(`/${savedLanguage}`);
      }
      // Update localStorage when translation changes
      localStorage.setItem('language', translation);
    }
  }, [translation, pathname, router]);

  const toggleTranslation = (lang) => {
    setTranslation(lang);
  };

  return (
    <LanguageContext.Provider value={{ translation, toggleTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};
