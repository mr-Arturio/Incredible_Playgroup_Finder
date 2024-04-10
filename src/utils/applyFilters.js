const applyFilters = (data, criteria) => {
  return data.filter(item => {
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
    return true;
  });
};

export default applyFilters;