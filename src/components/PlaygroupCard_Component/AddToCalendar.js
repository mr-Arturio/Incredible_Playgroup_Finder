import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useLanguage } from "../../context/LanguageContext";

const AddToCalendar = ({
  name,
  address,
  date,
  startTime,
  endTime,
  Cancelled,
}) => {
  const { translation } = useLanguage();

  if (Cancelled === "yes") return null;

  return (
    <>
      <div className="hidden sm:inline">
        <AddToCalendarButton
          name={name}
          options={["Google", "Outlook.com", "Apple"]}
          location={address}
          startDate={date}
          endDate={date}
          startTime={startTime}
          endTime={endTime}
          timeZone="Canada/Eastern"
          size="1|1|0"
          listStyle="modal"
          buttonStyle="text"
          language={translation === "fr" ? "fr" : "en"}
        />
      </div>
      <div className="sm:hidden">
        <AddToCalendarButton
          name={name}
          options={["Google", "Outlook.com", "Apple"]}
          location={address}
          startDate={date}
          endDate={date}
          startTime={startTime}
          endTime={endTime}
          timeZone="Canada/Eastern"
          size="0"
          listStyle="modal"
          hideTextLabelButton
          lightMode="system"
        />
      </div>
    </>
  );
};

export default AddToCalendar;
