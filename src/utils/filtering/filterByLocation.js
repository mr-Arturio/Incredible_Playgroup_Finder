const filterByLocation = (data, location) => {
  if (!location) return data; // Return all data if no location filter is applied
  return data.filter(row => row.Location === location);
};

export default filterByLocation;