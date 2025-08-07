import React, { useState } from "react";
import BasePlaygroupCard from "./BasePlaygroupCard";
import { PlaygroupEvent } from "../../types";

interface PlaygroupCardProps {
  playgroup: PlaygroupEvent;
}

function PlaygroupCard({ playgroup }: PlaygroupCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Function to toggle the expanded state
  const toggleExpand = (): void => setIsExpanded(!isExpanded);

  return (
    <BasePlaygroupCard 
      playgroup={playgroup} 
      onExpand={toggleExpand} 
      isExpanded={isExpanded} 
    />
  );
}

export default PlaygroupCard; 