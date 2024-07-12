"use client";

import React from "react";
import { t } from "i18next";

const ContactForm = () => {


  return (
    <div className="flex flex-col items-start justify-center bg-gray-100 py-4">
      <h2 className="text-2xl font-bold my-4">{t("contactForm.needHelp")}</h2>
      <p className="text-lg text-center mb-4">{t("contactForm.message")}</p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScriz1W2G8caKuIYcnJtb-V_j4JzNgFmyDOoULg0NDZHicoHg/viewform?usp=pp_url"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-mainBlue hover:bg-hoverBlue text-white font-bold py-2 px-4 rounded-lg"
      >
        {t("contactForm.contactUs")}
      </a>
    </div>
  );
}

export default ContactForm;
