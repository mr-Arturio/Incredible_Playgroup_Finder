// "use client";

import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import geocodeAddresses from "../utils/geocodeAddresses"; // Adjust the path as necessary


function MapComponent({ sheetData}) {
  const center = useMemo(() => ({ lat: 45.424721, lng: -75.695 }), []); //to avoid re-rendering, 
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    // libraries: ["places"],
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
 // Check if sheetData is not undefined before proceeding
 if (sheetData && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
  const addresses = sheetData.map(data => data.Address);
  console.log("Addresses:", addresses);
  geocodeAddresses(addresses, process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    .then((geocodedMarkers) => {
      setMarkers(geocodedMarkers);
    })
    .catch((error) => console.error("Geocoding error:", error));
}
}, [sheetData]); // Depend on sheetData

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={10}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </div>
  );
}

export default React.memo(MapComponent);