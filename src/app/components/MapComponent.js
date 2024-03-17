"use client";

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
  lat: 45.424721,
  lng: -75.695,
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const addresses = ['343 Parkin Circle, Ottawa, ON, Canada', '2330 Don Reid Dr, Ottawa, ON, Canada'];

    const geocodeAddresses = async (addresses) => {
      const promises = addresses.map(address =>
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
          .then(response => {
            console.log(`Response from geocoding API for ${address}:`, response);
            return response.json();
          })
          .then(data => {
            console.log(data);
            if (data.results && data.results.length > 0) {
              const location = data.results[0].geometry.location;
             
              return {
                lat: location.lat,
                lng: location.lng,
              };
            } else {
              throw new Error('Geocoding failed for address: ' + address);
            }
          })
      );
    
      try {
        const geocodedMarkers = await Promise.all(promises);
        setMarkers(geocodedMarkers);
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddresses(addresses);
  }, []);

  return isLoaded ? (
    <div className="w-full md:w-96 h-96">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={10}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(MapComponent);
