import React from "react";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const AddToCalendar = ({ name, address, date, startTime, endTime, Cancelled }) => {
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
        size="1"
        listStyle="modal"
        buttonStyle="text"
        trigger="click"
      />
    
  );
};

export default AddToCalendar;
