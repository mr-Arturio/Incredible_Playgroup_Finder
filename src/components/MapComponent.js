// "use client";

import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { geocodeAddresses } from "../utils/geocodeAddresses"; // Adjust the path as necessary

function MapComponent({ sheetData }) {
  const fallbackCenter = useMemo(() => ({ lat: 45.424721, lng: -75.695 }), []);
  const [center, setCenter] = useState(fallbackCenter);
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
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

  // Fetch the user's location and update the center of the map
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userCoords);
          setUserLocation(userCoords); // Update user's location state
        },
        (error) => {
          console.error("Error fetching the user's location: ", error);
          // Use fallback center if there's an error or permission is denied
          setCenter(fallbackCenter);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // High accuracy option
      );
    } else {
      // Geolocation API not supported
      console.error("Geolocation is not supported by this browser.");
      // Use fallback center
      setCenter(fallbackCenter);
    }
  }, []);

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
        {userLocation && (
          <Marker
            position={userLocation}
            // Specify your custom icon URL
            icon={{
              url: '/home.svg',
              scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default React.memo(MapComponent);
