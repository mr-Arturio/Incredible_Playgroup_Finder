import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useLanguage } from "../../context/LanguageContext";

const AddToCalendar = ({
  name,
  address,
  date,
  startTime,
  endTime,
  Cancelled,
  Paused,
}) => {
  const { translation } = useLanguage();

  if (Cancelled === "yes" || Paused === "yes") return null;

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
          styleLight=".atcb-modal {
            width: 200px;
          }; 
          .atcb-list-item {
            font-size: 1.5em;
          }"
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
          lightMode="light"
          styleLight=".atcb-modal {
            width: 200px;
          }; 
          .atcb-list-item {
            font-size: 1.25em;
          }"
        />
      </div>
    </>
  );
};

export default AddToCalendar;
