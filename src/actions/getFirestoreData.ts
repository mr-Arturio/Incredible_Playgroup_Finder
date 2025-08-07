"use server";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { PlaygroupEvent, FirestoreDataResponse } from "../types";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

const db = getFirestore();

//  Connect to Firestore Emulator if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
}

// Simple in-memory cache
let cache: {
  data: PlaygroupEvent[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 5 minutes

export async function getFirestoreData(): Promise<FirestoreDataResponse> {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log("📦 Using cached data");
      return {
        props: {
          eventData: JSON.parse(JSON.stringify(cache.data)),
        },
      };
    }

    console.log("🔥 Fetching fresh data from Firestore");
    const snapshot = await db.collection("playgroups").get();

    const invalidDates: any[] = [];
    const invalidTimes: any[] = [];

    const data: PlaygroupEvent[] = snapshot.docs.map((doc) => {
      const plainData = doc.data() as PlaygroupEvent;

      // Convert Firestore GeoPoint to plain object
      if (plainData.geopoint?.latitude && plainData.geopoint?.longitude) {
        plainData.geopoint = {
          latitude: plainData.geopoint.latitude,
          longitude: plainData.geopoint.longitude,
        };
      }

      // Optional: Add document ID if needed
      plainData.id = doc.id;

      // Check for invalid or missing eventDate
      if (
        typeof plainData.eventDate !== "string" ||
        !plainData.eventDate.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        invalidDates.push(plainData);
        console.warn("Invalid eventDate in document:", plainData);
      }

      // ✅ Validate time (adjust this if your format is a range like "08:30 - 12:30")
      if (
        typeof plainData.Time !== "string" ||
        !/^\d{2}:\d{2}(\s*-\s*\d{2}:\d{2})?$/.test(plainData.Time.trim())
      ) {
        invalidTimes.push(plainData);
        console.warn(
          "⏰ Invalid time format:",
          plainData.Time,
          "in:",
          plainData
        );
      }

      return plainData;
    });

    // Update cache
    cache = {
      data,
      timestamp: Date.now(),
    };

    return {
      props: {
        eventData: JSON.parse(JSON.stringify(cache.data)),
      },
    };
  } catch (error: any) {
    console.error("❌ Firebase error:", error);

    // If quota exceeded, try to return cached data
    if (error.code === 8 && cache) {
      console.log("⚠️ Quota exceeded, using cached data");
      return {
        props: {
          eventData: JSON.parse(JSON.stringify(cache.data)),
        },
      };
    }

    return {
      props: {
        eventData: [],
      },
    };
  }
}
