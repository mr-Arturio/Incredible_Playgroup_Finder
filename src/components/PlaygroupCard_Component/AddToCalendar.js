import React, { useEffect, useState } from "react";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const AddToCalendar = ({ name, address, date, startTime, endTime, Cancelled }) => {
  const [buttonSize, setButtonSize] = useState("1");

  useEffect(() => {
    // Function to update the button size based on window width
    const updateButtonSize = () => {
      if (window.innerWidth < 640) {
        setButtonSize("0"); // small screens
      } else {
        setButtonSize("1"); // larger screens
      }
    };

    // Initial call to set the button size
    updateButtonSize();

    // Event listener for window resize
    window.addEventListener("resize", updateButtonSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateButtonSize);
  }, []);

  if (Cancelled === "Yes") return null;

  return (
    <AddToCalendarButton
      name={name}
      options={["Google", "Outlook.com", "Apple"]}
      location={address}
      startDate={date}
      endDate={date}
      startTime={startTime}
      endTime={endTime}
      timeZone="Canada/Eastern"
      size={buttonSize}
      listStyle="modal"
      buttonStyle="text"
      trigger="click"
    />
  );
};

export default AddToCalendar;
