import React, { useState } from "react";
import getIcons from "../../utils/icons";
import SmallPlaygroupCard from "./SmallPlaygroupCard";
import CardHeader from "./CardHeader";
import CardDetails from "./CardDetails";
import CardFooter from "./CardFooter";

function PlaygroupCard({ playgroup }) {
  const {
    Date,
    Time,
    Name,
    Address,
    Age,
    Day,
    Language,
    URL,
    Service,
    Parking,
    Coffee,
    WiFi,
    Outdoor,
    Cancelled,
    Notes,
    Scale
  } = playgroup;

  const icons = getIcons(Parking, Coffee, WiFi, Outdoor, Language, Scale);

  const [isExpanded, setIsExpanded] = useState(false); // State for expanding/collapsing the card
  const [tooltip, setTooltip] = useState("");

  // Function to toggle the expanded state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Conditional style classes
  const cardStyle =
    Cancelled === "Yes" ? "bg-gray-400 opacity-50" : "bg-blue-100";
  const cardClasses = `shadow-lg rounded-lg overflow-hidden m-4 relative ${cardStyle}`;

  return (
    <div className={cardClasses}>
      {isExpanded ? (
        <>
        <CardHeader
        URL={URL}
        Name={Name}
        Day={Day}
        Date={Date}
        Service={Service}
        Cancelled={Cancelled}
      />
      <CardDetails
        Time={Time}
        Address={Address}
        Age={Age}
        Notes={Notes}
        icons={icons}
      />
      <CardFooter
        icons={icons}
        tooltip={tooltip}
        setTooltip={setTooltip}
        onExpand={toggleExpand}
        isExpanded={isExpanded}
        URL={URL}
      />
    </>
      ) : (
        <SmallPlaygroupCard playgroup={playgroup} onExpand={toggleExpand} />
      )}
    </div>
  );
}

export default PlaygroupCard;
