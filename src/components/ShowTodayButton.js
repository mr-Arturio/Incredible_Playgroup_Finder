const ShowTodayButton = ({ onShowToday }) => {
  const handleShowToday = () => {
    onShowToday();
  };

  return (
    <button
      className="p-2 md:text-base text-sm text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center"
      onClick={handleShowToday}
    >
      Show Today&apos;s Playgroups
    </button>
  );
};

export default ShowTodayButton;
