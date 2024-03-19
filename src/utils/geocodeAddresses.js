const geocodeAddresses = async (addresses, apiKey) => {
  const promises = addresses.map((address) =>
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng,
          };
        } else {
          throw new Error("Geocoding failed for address: " + address);
        }
      })
  );

  try {
    const geocodedMarkers = await Promise.all(promises);
    return geocodedMarkers;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error; // Re-throw to handle it in the calling component.
  }
};

export default geocodeAddresses;
