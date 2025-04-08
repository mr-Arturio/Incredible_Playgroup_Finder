const ShowTodayButton = ({ onShowToday, translation }) => {
  const handleShowToday = () => {
    onShowToday();
  };

  return (
    <button
      className="p-1 md:p-2 md:text-base text-xs text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center shadow-md hover:shadow-xl transition duration-200 ease-in-out "
      onClick={handleShowToday}
    >
      {translation === "fr"
        ? "Afficher les groupes d'aujourd'hui"
        : "Show Today's Playgroups"}
    </button>
  );
};

export default ShowTodayButton;
