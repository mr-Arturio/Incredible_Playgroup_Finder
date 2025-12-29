import { useLanguage } from "../../context/LanguageContext";

const ShowActiveOnly = () => {
  const { translation } = useLanguage();

  return (
    <div className="mt-3 flex items-center">
      <input
        type="checkbox"
        id="showActiveOnly"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
      />
      <label
        htmlFor="showActiveOnly"
        className="ml-2 text-xs text-gray-700 cursor-pointer whitespace-nowrap"
      >
        {translation === "fr"
          ? "Afficher uniquement les actifs"
          : "Show active only"}
      </label>
    </div>
  );
};

export default ShowActiveOnly;
