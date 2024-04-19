import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image'; // Ensure Next.js Image component is correctly imported.

const DatePickerComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (date) => {
    setStartDate(date);
    onDateChange(date);  // This will call the passed handleDateChange function.
    setIsOpen(false);  // Close the calendar after the date is selected.
  };

  return (
    <div className="relative w-full">
      {/* Calendar Icon */}
      <button
        onClick={toggleCalendar}
        className="flex justify-center items-center"
        style={{ zIndex: 2 }} // Make sure the button is over the DatePicker
      >
        <Image
          src='/calendar.svg'
          alt="Calendar Icon"
          width={40}  // Size of the icon
          height={40}
        />
      </button>

      {/* DatePicker */}
      {isOpen && (
        <div style={{ position: 'absolute', top: '3rem', left: 0, width: '100%' }}>
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
