

// import React, { useEffect, useState } from "react";
// import { getSheetData } from "../../actions/getSheetData";
// import RenderSheetDataTable from "../../components/RenderSheetDataTable";
// import { Header } from "../../components/Header";
import ContactForm from "../../components/ContactForm";
// import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "../i18n";

async function Home({ params: { lng } }) {
  // const [sheetData, setSheetData] = useState(null);
  // const [language, setLanguage] = useState("en");
  const { t } = await useTranslation(lng);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getSheetData();
  //     setSheetData(response.props.sheetData);
  //   };
  //   fetchData();
  // }, []);

  // const handleLanguageChange = (lang) => {
  //   setLanguage(lang);
  // };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-4">
      <div className="container pb-4">
        {/* <Header /> */}
        {/* <LanguageSwitcher onLanguageChange={handleLanguageChange} /> */}
      </div>
      <main className="container flex-1">
        {/* <RenderSheetDataTable sheetData={sheetData} /> */}
        <section>
          <h2 className="text-2xl font-bold mt-4"> {t("needHelp")} </h2>
          <ContactForm lng={lng} />
        </section>
      </main>
    </div>
  );
}

export default Home;
