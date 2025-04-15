'use client';
import { useEffect } from 'react';

export default function SWRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => {
          console.log('Service worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service worker registration failed:', error);
        });
    }
  }, []);
  
  return null;
}
