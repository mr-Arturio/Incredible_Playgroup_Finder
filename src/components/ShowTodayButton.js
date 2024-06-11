const ShowTodayButton = ({ onShowToday }) => {
  const handleShowToday = () => {
    onShowToday();
  };

  return (
    <button
      className="p-2 md:text-base text-sm text-white bg-blue-500 hover:bg-blue-700 rounded-lg flex items-center justify-center"
      onClick={handleShowToday}
    >
      Show Today&apos;s Playgroups
    </button>
  );
};

export default ShowTodayButton;
