import React, { useState, useEffect, useMemo } from "react";
import Loading from "./Loading";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { geocodeAddresses } from "../utils/geocodeAddresses"; // Adjust the path as necessary

function MapComponent({ sheetData, onMarkerSelect, selectedAddress }) {
  const fallbackCenter = useMemo(() => ({ lat: 45.424721, lng: -75.695 }), []);
  const [center, setCenter] = useState(fallbackCenter);
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [hoveredMarker, setHoveredMarker] = useState(null); // Track hovered marker
  const [clickedMarker, setClickedMarker] = useState(null); // Track clicked marker on mobile
  const [firstTapMarker, setFirstTapMarker] = useState(null); // Track first tap on mobile
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!sheetData) return;
    // Filter out the data with valid lat and lng information
    const markersWithLatLng = sheetData.filter((data) => {
      // Convert lat and lng strings to numbers
      const lat = parseFloat(data.lat);
      const lng = parseFloat(data.lng);
      // Check if lat and lng are valid numbers
      const isValidLatLng = !isNaN(lat) && !isNaN(lng);
      // Log an error if lat or lng is invalid
      // if (!isValidLatLng) {
      //   console.error("Invalid latitude or longitude:", data);
      // }
      return isValidLatLng;
    });
    // Filter unique addresses
    const uniqueMarkers = [];
    const addresses = new Set();

    markersWithLatLng.forEach((marker) => {
      if (!addresses.has(marker.Address)) {
        uniqueMarkers.push(marker);
        addresses.add(marker.Address);
      }
    });

    setMarkers(uniqueMarkers);
    console.log(`Number of markers shown: ${uniqueMarkers.length}`);
    // console.log(
    //   "Visible addresses:",
    //   uniqueMarkers.map((marker) => marker.Address)
    // );
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
  }, [fallbackCenter]);

  const createKey = (lat, lng, address) => `${lat}-${lng}-${address}`;

  const handleMarkerClick = (marker) => {
    const markerKey = createKey(marker.lat, marker.lng, marker.Address);

    if (isMobile) {
      if (firstTapMarker === markerKey) {
        // Second tap: Select the marker
        onMarkerSelect(marker.Address); // Notify parent component
        setFirstTapMarker(null); // Reset the first tap
        setClickedMarker(markerKey); // Highlight the selected marker
      } else {
        // First tap: Show InfoWindow
        setFirstTapMarker(markerKey); // Track the first tap
        setClickedMarker(null); // Close other markers
      }
    } else {
      // For desktop, follow the normal behavior
      onMarkerSelect(marker.Address);
    }
  };

  if (!isLoaded) return <Loading />;

  return (
    <div className="w-full content-start mt-0 lg:ml-0 xl:pl-1 rounded-md md:rounded-t-none overflow-hidden shadow-md h-full md:h-[80vh]">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={11}
        options={{
          gestureHandling: isMobile ? "cooperative" : "auto", // Use "cooperative" to allow normal scrolling
          mapTypeControl: false, // Disables the map type (Satellite/Terrain) options
        }}
      >
        {markers.map((marker) => (
          <Marker //need to parseFloat again to avoid error... thats where TypeScript would be useful
            key={createKey(marker.lat, marker.lng, marker.Address)}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
            onClick={() => handleMarkerClick(marker)}
            onMouseOver={() =>
              setHoveredMarker(
                createKey(marker.lat, marker.lng, marker.Address)
              )
            }
            onMouseOut={() => setHoveredMarker(null)}
          >
            {(hoveredMarker ===
              createKey(marker.lat, marker.lng, marker.Address) ||
              clickedMarker ===
                createKey(marker.lat, marker.lng, marker.Address) ||
              firstTapMarker ===
                createKey(marker.lat, marker.lng, marker.Address)) && (
              <InfoWindow
                position={{
                  lat: parseFloat(marker.lat),
                  lng: parseFloat(marker.lng),
                }}
                onCloseClick={() => {
                  setClickedMarker(null);
                  setFirstTapMarker(null);
                }}
                options={{ disableAutoPan: true }}
              >
                <div className="max-w-xs font-sans p-1">
                  <h3
                    className="text-sm font-bold text-gray-800 -mt-2"
                    aria-label={marker.Organizer}
                  >
                    {marker.Organizer}
                  </h3>
                  <p className="text-sm text-gray-600 -my-1">
                    {marker.Address}
                  </p>
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
