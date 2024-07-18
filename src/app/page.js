"use client";

import React, { useEffect, useState } from "react";
import { getSheetData } from "../actions/getSheetData";
import RenderSheetDataTable from "../components/RenderSheetDataTable";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

function Home() {
  const [sheetData, setSheetData] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData();
      setSheetData(response.props.sheetData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-4">
        <div className="container pb-4">
          <Header />
          <LanguageSwitcher />
        </div>
        <main className="container flex-1">
          <RenderSheetDataTable sheetData={sheetData} language={language} />
          <section>
            <h2 className="text-2xl font-bold mt-4">Need Help?</h2>
            <ContactForm />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
