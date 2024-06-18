import React from "react";
import BasePlaygroupCard from "./BasePlaygroupCard";

function SmallPlaygroupCard({ playgroup, onExpand }) {
  return (
    <BasePlaygroupCard 
      playgroup={playgroup} 
      onExpand={onExpand} 
      isExpanded={false} 
    />
  );
}

export default SmallPlaygroupCard;
