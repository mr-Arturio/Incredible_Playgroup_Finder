export const handleDateChange = (
  date,
  setStartDate,
  setFilterCriteria,
  filterCriteria
) => {
  // Create a new Date object with the time set to midnight in local time
  const adjustedDate = new Date(date);
  adjustedDate.setHours(0, 0, 0, 0);

  setStartDate(adjustedDate);
  setFilterCriteria({
    ...filterCriteria,
    date: adjustedDate.toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
  });
};
