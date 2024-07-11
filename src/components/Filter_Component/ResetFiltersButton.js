import React from "react";
import { useTranslation } from "../../app/i18n/client";

const ResetFiltersButton = ({ resetFilters, lng }) => {
  const { t } = useTranslation(lng);
  return (
    <button
    onClick={resetFilters}
    className="mt-4 lg:mt-0 bg-mainBlue hover:bg-hoverBlue text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline h-full lg:w-auto"
  >
    {t("filterContainer.reset")}
  </button>
  )
}

export default ResetFiltersButton;