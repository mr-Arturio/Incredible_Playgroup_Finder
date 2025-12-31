const ResetFiltersButton = ({ resetFilters, translation, hasActiveFilters }) => {
  return (
    <button
      onClick={resetFilters}
      className={`mt-4 lg:mt-0 text-white font-bold py-3 px-4 text-sm rounded-lg focus:outline-none focus:shadow-outline h-full lg:w-auto ${
        hasActiveFilters ? 'bg-reset hover:bg-resetHover' : 'bg-gray-400 cursor-not-allowed'
      }`}
      disabled={!hasActiveFilters}
    >
      {translation === "fr" ? "Réinitialiser les filtres" : "Reset Filters"}
    </button>
  );
};

export default ResetFiltersButton;
