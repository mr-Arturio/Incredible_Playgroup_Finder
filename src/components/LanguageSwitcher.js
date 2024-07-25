'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { translation, toggleTranslation } = useLanguage();
  const [clientLanguage, setClientLanguage] = useState(null);

  useEffect(() => {
    setClientLanguage(translation);
  }, [translation]);

  const handleLanguageChange = (lang) => {
    toggleTranslation(lang);
  };

  // Render null until client-side language state is set
  if (clientLanguage === null) return null;

  return (
    <div className="absolute top-0  right-0 flex z-10">
      <button 
        className={`px-1 py-1 text-md md:px-3 md:py-1 rounded-bl-lg shadow-lg transition-colors duration-300 ${
          clientLanguage === 'en' ? 'bg-amber text-white' : 'bg-gray-200 text-gray-500'
        }`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
      <button
        className={`px-1 py-1 text-md md:px-3 md:py-1 rounded-br-lg shadow-lg transition-colors duration-300 ${
          clientLanguage === 'fr' ? 'bg-amber text-white' : 'bg-gray-200 text-gray-500'
        }`}
        onClick={() => handleLanguageChange('fr')}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
