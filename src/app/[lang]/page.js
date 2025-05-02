"use client";

import React, { useEffect, useState } from "react";
import { getSheetData } from "../../actions/getSheetData";
import RenderSheetDataTable from "../../components/RenderSheetDataTable";
import IntroductionText from "../../components/IntroductionText";
import ContactForm from "../../components/ContactForm";
import { useLanguage } from "../../context/LanguageContext";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import Background  from "../../components/Background";
import { useParams } from "next/navigation";

function Home() {
  const [sheetData, setSheetData] = useState(null);
  const { translation, toggleTranslation } = useLanguage();
  const { lang } = useParams();

  useEffect(() => {
    // console.log("Home component - URL lang:", lang);
    // console.log("Home component - Current translation:", translation);

    // Only update translation if it doesn't match the URL
    if (lang === "fr" && translation !== "fr") {
      // console.log("Switching to French");
      toggleTranslation("fr");
    } else if (!lang && translation !== "en") {
      // console.log("Switching to English");
      toggleTranslation("en");
    }
  }, [lang]); // Remove unnecessary dependencies to avoid re-triggering

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData();
      setSheetData(response.props.sheetData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Background>
        <div className="container">
          <IntroductionText />
        </div>
        <main className="container flex-1">
          <RenderSheetDataTable
            sheetData={sheetData}
            translation={translation}
          />
          <section>
            <ContactForm />
          </section>
        </main>
      </Background>
      <Footer />
    </>
  );
}

export default Home;
