const applyFilters = (data, criteria) => {
  return data.filter(item => {
    if (criteria.location && item.Location !== criteria.location) {
      return false;
    }
    if (criteria.language && item.Language !== criteria.language) {
      return false;
    }
    return true;
  });
};

export default applyFilters;