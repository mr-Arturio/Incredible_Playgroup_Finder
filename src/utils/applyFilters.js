const applyFilters = (data, criteria) => {
  const categorizeTime = (timeString) => {
    const startTime = parseInt(timeString.split(' - ')[0].replace(':', ''), 10);
    if (startTime < 1200) return "Morning";
    if (startTime >= 1200 && startTime < 1600) return "Afternoon";
    if (startTime >= 1600) return "Evening";
  };

  return data.filter((item) => {
    if (criteria.location && item.Location !== criteria.location) {
      return false;
    }
    if (criteria.language && item.Language !== criteria.language) {
      return false;
    }
    if (criteria.day && item.Day !== criteria.day) {
      return false;
    }
    if (criteria.name && item.Name !== criteria.name) {
      return false;
    }
    if (criteria.age && item.Age !== criteria.age) {
      return false;
    }
    if (criteria.time && categorizeTime(item.Time) !== criteria.time) {
      return false;
    }
    // make sure data is in ISO format 'YYYY-MM-DD'
    if (criteria.date && item.Date !== criteria.date) {
        return false;
      }
    
    return true;
  });
};

export default applyFilters;
