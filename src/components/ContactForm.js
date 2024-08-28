import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ContactForm() {
  const { translation } = useLanguage();
  const [translations, setTranslations] = useState({
    title: "",
    contactUs: "",
    needHelp: "",
  });

  useEffect(() => {
    // Set translations based on current language
    setTranslations({
      title:
        translation === "fr" ? (
          <p>
            N&apos;hésitez pas à nous faire part de vos questions, commentaires ou réactions:
          </p>
        ) : (
          <p>
            Please send us any questions, comments or feedback you
            may have:
          </p>
        ),
      contactUs: translation === "fr" ? "Qu'en pensez-vous ?" : "Provide Feedback",
      needHelp: translation === "fr" ? "Besoin d'aide ?" : "Need Support?",
    });
  }, [translation]);

  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold mt-4 lg:mt-2 pl-2.5 md:pl-5">
        {translations.needHelp}
      </h2>
      <div className="flex flex-col items-start justify-center bg-gray-100/25 md:py-4 pb-3 pt-2 pl-2.5 md:pl-5 rounded-lg">
        <div className="text-sm md:text-lg mb-2.5 md:mb-4">{translations.title}</div>
        <a
          href="https://www.surveymonkey.com/r/IPFprc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-mainBlue hover:bg-hoverBlue text-white text-sm md:text-base font-semibold md:font-bold py-1 px-3 md:py-2 md:px-4 rounded-lg"
        >
          {translations.contactUs}
        </a>
      </div>
    </>
  );
}

export default ContactForm;
