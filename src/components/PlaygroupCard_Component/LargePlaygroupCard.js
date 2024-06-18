import React, { useState } from "react";
import BasePlaygroupCard from "./BasePlaygroupCard";

function PlaygroupCard({ playgroup }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <BasePlaygroupCard 
      playgroup={playgroup} 
      onExpand={toggleExpand} 
      isExpanded={isExpanded} 
    />
  );
}

export default PlaygroupCard;
