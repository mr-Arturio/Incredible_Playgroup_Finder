const geocodeAddress = async (address, apiKey) => {
  const cachedResult = localStorage.getItem(address);
  if (cachedResult) {
    return JSON.parse(cachedResult);
  } else {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const marker = { lat: location.lat, lng: location.lng };
      localStorage.setItem(address, JSON.stringify(marker));
      return marker;
    } else {
      throw new Error("Geocoding failed for address: " + address);
    }
  }
};

const geocodeAddresses = async (addresses, apiKey) => {
  // Create a Set from addresses to filter out duplicates, then convert back to an array
  const uniqueAddresses = Array.from(new Set(addresses));
  try {
    const geocodePromises = uniqueAddresses.map(address => geocodeAddress(address, apiKey));
    const results = await Promise.allSettled(geocodePromises);
    const geocodedMarkers = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

      console.log("Number of markers to be placed on the map:", geocodedMarkers);

    return geocodedMarkers;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

export default geocodeAddresses;
