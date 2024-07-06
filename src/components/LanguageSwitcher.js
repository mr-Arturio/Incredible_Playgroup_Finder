'use client'

import React, { useState } from 'react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className="absolute top-1 md:mt-4 md:flex md:top-3 md:right-4 right-1 flex z-10">
      <button
        className={`px-1 py-1  text-md md:px-3 md:py-1 rounded-l-lg shadow-lg transition-colors duration-300 ${
          language === 'en' ? 'bg-amber text-white' : 'bg-gray-200 text-gray-500'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-1 py-1 text-md md:px-3 md:py-1 rounded-r-lg shadow-lg transition-colors duration-300 ${
          language === 'fr' ? 'bg-amber text-white' : 'bg-gray-200 text-gray-500'
        }`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
