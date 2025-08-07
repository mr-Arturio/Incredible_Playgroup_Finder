import React from "react";
import { useLanguage } from "../context/LanguageContext";

const NoDataText: React.FC = () => {
  const { translation } = useLanguage();

  const translations = {
    noData:
      translation === "fr"
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