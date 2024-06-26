const applyFilters = (data, criteria, selectedAddress) => {
  // Create a date string for today's date in 'YYYY-MM-DD' format
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];

  const categorizeTime = (timeString) => {
    const startTime = parseInt(timeString.split(" - ")[0].replace(":", ""), 10);
    if (startTime < 1200) return "Morning";
    if (startTime >= 1200 && startTime < 1600) return "Afternoon";
    if (startTime >= 1600) return "Evening";
  };

  return data.filter((item) => {
    // Date check for past dates
    const itemDateString = new Date(item.Date).toISOString().split("T")[0];
    if (itemDateString < todayDateString) return false;

    // If there's a selected address and no other criteria, return true if the address matches
    const noOtherCriteria = Object.values(criteria).every((val) => val === "");

    if (noOtherCriteria && selectedAddress === item.Address) return true;

    if (criteria.location && item.Location !== criteria.location) return false;

    if (criteria.language && item.Language !== criteria.language) return false;

    if (criteria.day && item.Day !== criteria.day) return false;

    if (criteria.name && item.Name !== criteria.name) return false;

    if (criteria.age && item.Age !== criteria.age) return false;

    if (criteria.time && categorizeTime(item.Time) !== criteria.time)
      return false;

    // make sure data is in ISO format 'YYYY-MM-DD'
    if (criteria.date && itemDateString !== criteria.date) return false;

    return true;
  });
};

export default applyFilters;
