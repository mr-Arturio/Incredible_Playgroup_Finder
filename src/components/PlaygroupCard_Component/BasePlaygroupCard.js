import React, { useState } from "react";
import { getIcons, getSocialIcons } from "../../utils/icons";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardDetails from "./CardDetails";
import { useLanguage } from "../../context/LanguageContext";

function BasePlaygroupCard({ playgroup, onExpand, isExpanded }) {
  const {
    Organizer,
    Organizer_fr,
    Day,
    Time,
    eventDate,
    Service,
    Service_fr,
    Location,
    Address,
    Cancelled,
    Paused,
    URL,
    URL_fr,
    PG_URL,
    PG_URL_fr,
    Age,
    Language,
    Outdoor,
    WiFi,
    Parking,
    Coffee,
    Scale,
    FB,
    Insta,
    Eventbrite,
    Registration,
    Registration_URL,
    Notes,
    Notes_fr,
  } = playgroup;

  const { translation } = useLanguage();
  const icons = getIcons(
    translation,
    Parking,
    Coffee,
    WiFi,
    Outdoor,
    Language,
    Scale
  );
  const social = getSocialIcons(FB, Insta, Eventbrite);
  const [tooltip, setTooltip] = useState("");

  // Split Time into start and end times
  const [startTime, endTime] = Time.split(" - ");

  // Conditional style classes
  const cardStyle =
    Cancelled === "yes"
      ? "bg-gray-400 opacity-50"
      : Paused === "yes"
      ? "bg-blue-100 opacity-50"
      : "bg-blue-100";
  const cardClasses = `shadow-lg rounded-lg overflow-hidden m-4 relative ${cardStyle}`;

  return (
    <div className={cardClasses}>
      {Cancelled === "yes" && (
        <div
          className="absolute z-10 w-full h-full flex justify-center items-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            className="text-red-600 text-2xl md:text-3xl rotate-[17deg] tracking-widest font-extrabold"
            style={{ pointerEvents: "auto" }}
          >
            {translation === "en" ? "Cancelled" : "Annulé"}
          </span>
        </div>
      )}
      {Paused === "yes" && (
        <div
          className="absolute z-10 w-full h-full flex justify-center items-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            className="text-blue-600 text-2xl md:text-3xl -rotate-[17deg] tracking-widest font-extrabold"
            style={{ pointerEvents: "auto" }}
          >
            {translation === "en" ? "Paused" : "En Pause"}
          </span>
        </div>
      )}
      <CardHeader
        Organizer={Organizer}
        Organizer_fr={Organizer_fr}
        URL={URL}
        URL_fr={URL_fr}
        PG_URL={PG_URL}
        PG_URL_fr={PG_URL_fr}
        Location={Location}
        Day={Day}
        eventDate={eventDate}
        Service={Service}
        Service_fr={Service_fr}
        Cancelled={Cancelled}
        Paused={Paused}
        Time={Time}
        address={Address}
        startTime={startTime}
        endTime={endTime}
        Registration={Registration}
        Registration_URL={Registration_URL}
        translation={translation}
      />
      {isExpanded && (
        <CardDetails
          Time={Time}
          Address={Address}
          Age={Age}
          Notes={Notes}
          Notes_fr={Notes_fr}
          icons={icons}
          social={social}
          translation={translation}
        />
      )}
      <CardFooter
        icons={icons}
        social={social}
        tooltip={tooltip}
        setTooltip={setTooltip}
        onExpand={onExpand}
        isExpanded={isExpanded}
        translation={translation}
      />
    </div>
  );
}

export default BasePlaygroupCard;
