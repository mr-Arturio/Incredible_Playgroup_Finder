import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useTranslation } from "../../app/i18n/client";

const DatePickerComponent = ({ onDateChange, lng }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(lng);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (date) => {
    setStartDate(date);
    onDateChange(date); // This will call the passed handleDateChange function.
    setIsOpen(false); // Close the calendar after the date is selected.
  };

  // Date format function
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Calendar Icon */}
      <h2 className="text-md text-center font-semibold text-gray-700 mb-2">
        {t("filterContainer.datePicker")}
      </h2>
      <button
        onClick={toggleCalendar}
        className="hidden lg:flex justify-center items-center"
        style={{ zIndex: 2 }} // Make sure the button is over the DatePicker
      >
        <div className="w-10 h-10 relative">
          <Image
            src="/calendar.svg"
            alt="Calendar Icon"
            fill
            className="w-full h-auto"
          />
        </div>
      </button>

      {/* Date Box for lg screens and smaller */}
      <button
        onClick={toggleCalendar}
        className="flex lg:hidden justify-center items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none"
        style={{ zIndex: 2 }} // Make sure the button is over the DatePicker
      >
        {formatDate(startDate)}
      </button>

      {/* DatePicker */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "4.5rem",
            left: 0,
            width: "100%",
            zIndex: 3,
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            minDate={new Date()}
            inline
            className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
