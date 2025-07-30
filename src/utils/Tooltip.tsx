import React, { ReactNode } from "react";

interface TooltipProps {
  text?: string;
  children: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  className = "",
}) => {
  return (
    <div className="relative group">
      {children}
      {text && (
        <div
          className={`absolute bottom-full  mb-1.5 px-1.5 py-1 rounded-md z-[999] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${className}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
