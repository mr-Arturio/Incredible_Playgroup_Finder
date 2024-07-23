import { useLanguage } from "../context/LanguageContext";

const NoDataText = () => {
  const { language } = useLanguage();

  const translations = {
    noData:
      language === "fr"
        ? "Aucune donnée n'a été trouvée pour les filtres sélectionnés. Veuillez ajuster vos critères de recherche."
        : "No data was found for the selected filters. Please adjust your search criteria.",
  };

  return (
    <div className="flex justify-center items-center h-full">
      <span className="text-gray-500 text-center">{translations.noData}</span>
    </div>
  );
};

export default NoDataText;
