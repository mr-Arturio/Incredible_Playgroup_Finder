// "use client";

import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { geocodeAddresses } from "../utils/geocodeAddresses"; // Adjust the path as necessary

function MapComponent({ sheetData }) {
  const center = useMemo(() => ({ lat: 45.424721, lng: -75.695 }), []); //to avoid re-rendering,
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    // libraries: ["places"],
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!sheetData) return;

    // Filter out the data with valid lat and lng information
    const markersWithLatLng = sheetData.filter((data) => {
      // Log the lat and lng values to check if they are numbers
      //console.log("Latitude:", data.lat, "Longitude:", data.lng);

      // Convert lat and lng strings to numbers
      const lat = parseFloat(data.lat);
      const lng = parseFloat(data.lng);

      // Check if lat and lng are valid numbers
      const isValidLatLng = !isNaN(lat) && !isNaN(lng);

      if (!isValidLatLng) {
        console.error("Invalid latitude or longitude:", data);
      }

      return isValidLatLng;
    });

    setMarkers(markersWithLatLng);
  }, [sheetData]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="h-full w-full content-center">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "80%" }}
        center={center}
        zoom={11}
      >
        {markers.map((marker, index) => (
          <Marker //need to parseFloat again to avoid error... thats where TypeScript would be useful
            key={index}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default React.memo(MapComponent);
