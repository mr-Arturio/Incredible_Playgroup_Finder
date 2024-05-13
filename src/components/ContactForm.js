import React from "react";

function ContactForm() {
  return (
    <div className="flex flex-col items-start justify-center bg-gray-100 py-4">
      <p className="text-lg text-center mb-4">
        If you have any suggestions, comments, or found any issues with the schedule or any other information, please:
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScriz1W2G8caKuIYcnJtb-V_j4JzNgFmyDOoULg0NDZHicoHg/viewform?usp=pp_url"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Contact Us
      </a>
    </div>
  );
}

export default ContactForm;