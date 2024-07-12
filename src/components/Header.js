

import React, { useState } from "react";
import { t } from "i18next";

const Header = () => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsFullTextVisible((prevVisibility) => !prevVisibility);
  };

  const fullText = (
    <>
      <p>{t("headerText.fullText1")}</p>
      <br />
      <p>{t("headerText.fullText2")}</p>
      <br />
      <p>{t("headerText.fullText3")}</p>
      <br />
      <p>{t("headerText.fullText4")}</p>
    </>
  );

  const shortText = (
    <>
      <p>{t("headerText.shortText")}</p>
    </>
  );

  return (
    <div className="flex-col items-center justify-between">
      <div className="mt-8 md:mt-4 md:mb-8 text-left">
        <div className="hidden md:block">{fullText}</div>
        <div className="block md:hidden">
          {isFullTextVisible ? fullText : shortText}
          <button onClick={toggleTextVisibility} className="text-blue-500 mt-2">
            {isFullTextVisible ? t("showLess") : t("showMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
