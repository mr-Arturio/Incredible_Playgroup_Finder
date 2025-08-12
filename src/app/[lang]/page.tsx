"use client";

import React, { useEffect, useState } from "react";
// import { getFirestoreData } from "../../actions/getFirestoreData";
import RenderEventDataTable from "../../components/RenderEventDataTable";
import IntroductionText from "../../components/IntroductionText";
import ContactForm from "../../components/ContactForm";
import { useLanguage } from "../../context/LanguageContext";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import Background from "../../components/Background";
import { useParams } from "next/navigation";
import { PlaygroupEvent, Language } from "../../types";

const Home: React.FC = () => {
  const [eventData, setEventData] = useState<PlaygroupEvent[] | null>(null);
  const { translation, toggleTranslation } = useLanguage();
  const { lang } = useParams();

  useEffect(() => {
    // console.log("Home component - URL lang:", lang);
    // console.log("Home component - Current translation:", translation);

    // Only update translation if it doesn't match the URL
    if (lang === "fr" && translation !== Language.FRENCH) {
      // console.log("Switching to French");
      toggleTranslation(Language.FRENCH);
    } else if (!lang && translation !== Language.ENGLISH) {
      // console.log("Switching to English");
      toggleTranslation(Language.ENGLISH);
    }
  }, [lang, translation, toggleTranslation]); // Include all dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/playgroups", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setEventData(json.eventData as PlaygroupEvent[]);
      } catch (e) {
        console.error("Failed to load events:", e);
        setEventData([]);
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
          <RenderEventDataTable
            eventData={eventData}
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
};

export default Home;
