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
    Date,
    Service,
    Service_fr,
    Location,
    Address,
    Cancelled,
    Paused,
    Area,
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
    Cancelled === "Yes" ? "bg-gray-400 opacity-50" : "bg-blue-100";
  const cardClasses = `shadow-lg rounded-lg overflow-hidden m-4 relative ${cardStyle}`;

  return (
    <div className={cardClasses}>
      {Cancelled === "Yes" && (
        <div
          className="absolute z-10 w-full h-full flex justify-center items-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            className="text-red-500 text-2xl font-bold"
            style={{ pointerEvents: "auto" }}
          >
            Cancelled
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
        Date={Date}
        Service={Service}
        Service_fr={Service_fr}
        Cancelled={Cancelled}
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
          Cancelled={Cancelled}
        />
      )}
      <CardFooter
        icons={icons}
        social={social}
        tooltip={tooltip}
        setTooltip={setTooltip}
        onExpand={onExpand}
        isExpanded={isExpanded}
        URL={URL}
        address={Address}
        date={Date}
        startTime={startTime}
        endTime={endTime}
        Cancelled={Cancelled}
        translation={translation}
      />
    </div>
  );
}

export default BasePlaygroupCard;
