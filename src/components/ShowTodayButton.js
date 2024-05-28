import React from "react";

const ShowTodayButton = ({ onShowToday }) => {
  return (
    <button
      className="p-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg flex items-center justify-center mt-5"
      onClick={onShowToday}
    >
      Show Today's PlayGroups
    </button>
  );
};

export default ShowTodayButton;