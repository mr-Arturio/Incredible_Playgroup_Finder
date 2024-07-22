'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';

const ClientWrapper = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      {children}
    </>
  );
};

export default ClientWrapper;
