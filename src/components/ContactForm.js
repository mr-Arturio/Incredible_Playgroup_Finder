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
            Si vous avez des suggestions, des commentaires ou si vous rencontrez
            des problèmes avec l&apos;horaire ou toute autre information, veuillez:
          </p>
        ) : (
          <p>
            If you have any suggestions, comments, or found any issues with the
            schedule or any other information, please:
          </p>
        ),
      contactUs: translation === "fr" ? "Contactez-nous" : "Contact Us",
      needHelp: translation === "fr" ? "Besoin d'aide?" : "Need Help?",
    });
  }, [translation]);

  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold mt-4 lg:mt-2">
        {translations.needHelp}
      </h2>
      <div className="flex flex-col items-start justify-center bg-gray-100/50 md:py-4 pb-4 pt-2">
        <div className="text-sm md:text-lg mb-4">{translations.title}</div>
        <a
          href="https://www.parentresource.ca/form?fbclid=IwY2xjawEeht9leHRuA2FlbQIxMAABHf0881tGf0VmSI2x2JFUcD5OMyh09vE0ZX6OlM78NDQDiYcemV3K78fC3g_aem_vG2nWhW41ZPZ4Oo9oUXiRQ"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-mainBlue hover:bg-hoverBlue text-white font-bold py-1 px-3 md:py-2 md:px-4 rounded-lg"
        >
          {translations.contactUs}
        </a>
      </div>
    </>
  );
}

export default ContactForm;
