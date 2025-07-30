import { PlaygroupEvent, MapMarker } from "../types";

interface GeocodeResult {
  lat: number;
  lng: number;
}

const geocodeAddress = async (
  address: string,
  apiKey: string
): Promise<GeocodeResult> => {
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
      //console.log("Geocoded address:", address, marker);
      localStorage.setItem(address, JSON.stringify(marker));
      return marker;
    } else {
      throw new Error("Geocoding failed for address: " + address);
    }
  }
};

const geocodeAddresses = async (
  addresses: PlaygroupEvent[],
  apiKey: string
): Promise<PlaygroupEvent[]> => {
  // Create a Set from addresses to filter out duplicates, then convert back to an array
  const uniqueAddresses = Array.from(new Set(addresses));
  try {
    const addressesWithoutLatLng = uniqueAddresses.filter(
      (data) =>
        typeof data.lat === "undefined" || typeof data.lng === "undefined"
    );
    const addressesWithLatLng = uniqueAddresses.filter(
      (data) =>
        typeof data.lat !== "undefined" && typeof data.lng !== "undefined"
    );

    const geocodePromises = addressesWithoutLatLng.map((address) =>
      geocodeAddress(address.Address, apiKey)
    );
    const results = await Promise.allSettled(geocodePromises);
    const geocodedResults = results
      .filter(
        (result): result is PromiseFulfilledResult<GeocodeResult> =>
          result.status === "fulfilled"
      )
      .map((result, index) => ({
        ...addressesWithoutLatLng[index],
        lat: result.value.lat,
        lng: result.value.lng,
      }));

    const allMarkers = [...addressesWithLatLng, ...geocodedResults];

    //console.log("Number of markers to be placed on the map:", allMarkers);

    return allMarkers;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

export { geocodeAddress, geocodeAddresses };
