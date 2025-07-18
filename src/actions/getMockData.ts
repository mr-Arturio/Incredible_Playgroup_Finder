"use server";

import { FirestoreDataResponse } from "../types";

// Mock data for development when Firebase quota is exceeded
export async function getMockData(): Promise<FirestoreDataResponse> {
  const mockData = [
    {
      id: "mock-1",
      Address: "2330 Don Reid Drive",
      Age: "Child (0-6y)",
      Area: "South",
      Cancelled: false,
      Coffee: true,
      Day: "Tue",
      FB: "https://www.facebook.com/EarlyONCentreAndrewFleck",
      Language: "English",
      Location: "Don Reid Site",
      Notes:
        "Scale Available at Front Desk. Nut free-Scent free-Indoor shoes required-Waitlist if playgroup is full.",
      Notes_fr:
        "Pèse bébé disponible à l'accueil. Sans noix-Sans parfum. Souliers d'intérieur requis.",
      Organizer: "Andrew Fleck CS",
      Organizer_fr: "CE Andrew Fleck",
      Outdoor: false,
      PG_URL:
        "https://www.afchildrensservices.ca/earlyon-child-and-family-centre/monthly-programming-schedule/",
      PG_URL_fr:
        "https://www.afchildrensservices.ca/fr/centre-pour-lenfant-et-la-famille-on-y-va/calendrier-de-groupes-de-jeu/",
      Parking: true,
      Scale: true,
      Service: "EarlyON Playgroup",
      Time: "13:30 - 15:30",
      Toys: true,
      URL: "https://www.afchildrensservices.ca/support-and-services/earlyon-child-and-family-centre/",
      URL_fr:
        "https://www.afchildrensservices.ca/fr/centre-pour-lenfant-et-la-famille-on-y-va/",
      eventDate: "Tue Jul 01 2025 00:00:00 GMT-0400 (Eastern Daylight Time)",
      geopoint: {
        latitude: 45.3815899,
        longitude: -75.6530929,
      },
    },
    // Add more mock entries as needed
  ];

  return {
    props: {
      eventData: mockData,
    },
  };
}
