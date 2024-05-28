import React, { useState } from "react";
import getIcons from "../../utils/icons";
import Image from "next/image";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

function SmallPlaygroupCard({ playgroup, onExpand }) {
  const {
    Date,
    Time,
    Name,
    Day,
    Language,
    URL,
    Service,
    Parking,
    Coffee,
    WiFi,
    Outdoor,
    Cancelled,
  } = playgroup;

  const icons = getIcons(Parking, Coffee, WiFi, Outdoor, Language);
  const [tooltip, setTooltip] = useState("");
  const cancelledTextStyle = "text-red-500 text-2xl font-bold";

  return (
    <>
      {Cancelled === "Yes" && (
        <div
          className="absolute z-10 w-full h-full flex justify-center items-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            className={cancelledTextStyle}
            style={{ pointerEvents: "auto" }}
          >
            Cancelled
          </span>
        </div>
      )}
       <CardHeader
        URL={URL}
        Name={Name}
        Day={Day}
        Date={Date}
        Service={Service}
        Cancelled={Cancelled}
      />
      <div className="px-6 pb-3">
        <div className="flex items-center text-gray-700">
          <Image src="/time.svg" alt="Time" width={20} height={20} />
          <span className="ml-2">{Time}</span>
        </div>
      </div>
      <CardFooter
        icons={icons}
        tooltip={tooltip}
        setTooltip={setTooltip}
        onExpand={onExpand}
        isExpanded={false}
        URL={URL}
      />
    </>
  );
}

export default SmallPlaygroupCard;
