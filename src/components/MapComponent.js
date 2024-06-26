import React, { useState, useEffect, useMemo } from "react";
import Loading from "../app/loading";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { geocodeAddresses } from "../utils/geocodeAddresses"; // Adjust the path as necessary

function MapComponent({ sheetData, onMarkerSelect }) {
  const fallbackCenter = useMemo(() => ({ lat: 45.424721, lng: -75.695 }), []);
  const [center, setCenter] = useState(fallbackCenter);
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [hoveredMarker, setHoveredMarker] = useState(null); // Track hovered marker
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
      // Log an error if lat or lng is invalid
      if (!isValidLatLng) {
        console.error("Invalid latitude or longitude:", data);
      }
      return isValidLatLng;
    });
    // Filter unique addresses
    const uniqueMarkers = [];
    const addresses = new Set();

    markersWithLatLng.forEach((marker) => {
      // Clean the address by removing trailing spaces and periods
      const cleanedAddress = marker.Address.trim().replace(/\.*$/, "");

      if (!addresses.has(cleanedAddress)) {
        uniqueMarkers.push({ ...marker, Address: cleanedAddress });
        addresses.add(cleanedAddress);
      }
    });

    setMarkers(uniqueMarkers);
    console.log(`Number of markers shown: ${uniqueMarkers.length}`);
    console.log(
      "Visible addresses:",
      uniqueMarkers.map((marker) => marker.Address)
    );
  }, [sheetData]);

  // Fetch the user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // setCenter(userCoords); // Center the map on the user's location(removed in case user is not in Ottawa)
          setUserLocation(userCoords); // Update user's location state
        },
        (error) => {
          console.error("Error fetching the user's location: ", error);
          // Use fallback center if there's an error or permission is denied
          setCenter(fallbackCenter);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // High accuracy option
      );
    } else {
      // Geolocation API not supported
      console.error("Geolocation is not supported by this browser.");
      // Use fallback center
      setCenter(fallbackCenter);
    }
  }, []);

  const createKey = (lat, lng, address) => `${lat}-${lng}-${address}`;

  if (!isLoaded) return <Loading />;
  return (
    <div className="h-full w-full content-start mt-5 lg:ml-3">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "80%" }}
        center={center}
        zoom={11}
      >
        {markers.map((marker) => (
          <Marker //need to parseFloat again to avoid error... thats where TypeScript would be useful
            key={createKey(marker.lat, marker.lng, marker.Address)}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
            onClick={() => onMarkerSelect(marker.Address)}
            onMouseOver={() =>
              setHoveredMarker(
                createKey(marker.lat, marker.lng, marker.Address)
              )
            }
            onMouseOut={() => setHoveredMarker(null)}
          >
            {hoveredMarker ===
              createKey(marker.lat, marker.lng, marker.Address) && (
              <InfoWindow
                position={{
                  lat: parseFloat(marker.lat),
                  lng: parseFloat(marker.lng),
                }}
              >
                <div>
                  <h3>{marker.Name}</h3>
                  <p>{marker.Address}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "/home.svg",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onMouseOver={() => setHoveredMarker("userLocation")}
            onMouseOut={() => setHoveredMarker(null)}
          >
            {hoveredMarker === "userLocation" && (
              <InfoWindow position={userLocation}>
                <div>You are here</div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
    </div>
  );
}

export default React.memo(MapComponent);
