import { useLanguage } from "../context/LanguageContext";

function ContactForm() {
  const { language } = useLanguage();

  const translations = {
    title:
      language === "fr" ? (
        <p>
          Si vous avez des suggestions, des commentaires ou si vous rencontrez
          des problèmes avec l'horaire ou toute autre information, veuillez:
        </p>
      ) : (
        <p>
          {" "}
          If you have any suggestions, comments, or found any issues with the
          schedule or any other information, please:
        </p>
      ),
    contactUs: language === "fr" ? "Contactez-nous" : "Contact Us",
  };

  return (
    <div className="flex flex-col items-start justify-center bg-gray-100 py-4">
      <div className="text-lg text-center mb-4">{translations.title}</div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScriz1W2G8caKuIYcnJtb-V_j4JzNgFmyDOoULg0NDZHicoHg/viewform?usp=pp_url"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-mainBlue hover:bg-hoverBlue text-white font-bold py-2 px-4 rounded-lg"
      >
        {translations.contactUs}
      </a>
    </div>
  );
}

export default ContactForm;
