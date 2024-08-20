const ShowTodayButton = ({ onShowToday, translation }) => {
  const handleShowToday = () => {
    onShowToday();
  };

  return (
    <button
      className="p-1 md:p-2 md:text-base text-sm text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center "
      onClick={handleShowToday}
    >
      {translation === "fr" ? "Afficher les groupes d'aujourd'hui" : "Show Today's Playgroups"}
    </button>
  );
};

export default ShowTodayButton;
