"use client";

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: 45.424721,
  lng: -75.695
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  return isLoaded ? (
    // Wrap the GoogleMap component in a div styled with Tailwind CSS
    <div className="w-full md:w-96 h-96"> {/* Adjust width and height as needed */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }} // Make the map fill the container
        center={center}
        zoom={10}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(MapComponent);