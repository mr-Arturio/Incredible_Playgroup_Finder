'use client'

import React, { useState } from 'react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className="md:fixed top-4 right-4 flex static">
      <button
        className={`px-2 py-1 md:px-4 md:py-2 rounded-l-lg shadow-lg transition-colors duration-300 ${
          language === 'en' ? 'bg-amber text-white' : 'bg-gray-200 text-gray-500'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 md:px-4 md:py-2 rounded-r-lg shadow-lg transition-colors duration-300 ${
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
