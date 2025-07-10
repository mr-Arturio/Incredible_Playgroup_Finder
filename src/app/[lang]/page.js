"use client";

import React, { useEffect, useState } from "react";
import RenderSheetDataTable from "../../components/RenderSheetDataTable";
import IntroductionText from "../../components/IntroductionText";
import ContactForm from "../../components/ContactForm";
import { useLanguage } from "../../context/LanguageContext";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import Background from "../../components/Background";
import { useParams } from "next/navigation";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  //  Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/api/sheets`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Response not ok:", res.status, errorText);
          throw new Error(
            `Failed to fetch sheet data: ${res.status} ${errorText}`
          );
        }

        const responseData = await res.json();
        const { data } = responseData;

        if (!data || !Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setSheetData([]);
          return;
        }

        setSheetData(data);
      } catch (err) {
        console.error("Error fetching data from backend:", err);
        setSheetData([]); // Fallback
      }
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
