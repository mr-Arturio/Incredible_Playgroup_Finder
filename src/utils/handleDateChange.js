export const handleDateChange = (
  date,
  setStartDate,
  setFilterCriteria,
  filterCriteria
) => {
  // Create a new Date object with the time set to midnight
  const adjustedDate = new Date(date.setHours(0, 0, 0, 0));

  // Adjust the date to account for the timezone offset
  const timezoneOffset = adjustedDate.getTimezoneOffset() * 60000; // 60 seconds
  const localAdjustedDate = new Date(adjustedDate.getTime() - timezoneOffset);

  setStartDate(adjustedDate);
  setFilterCriteria({
    ...filterCriteria,
    date: localAdjustedDate.toISOString().split("T")[0],
  });
};
