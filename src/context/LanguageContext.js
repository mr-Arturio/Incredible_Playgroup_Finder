'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Initialize state with a function to avoid accessing localStorage directly
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      // Ensure we're running in the browser
      return localStorage.getItem('language') || 'en';
    }
    return 'en'; // Default to 'en' if window is not defined
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure we're running in the browser before accessing localStorage
      localStorage.setItem('language', language);
    }
  }, [language]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
