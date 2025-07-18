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

// Simple in-memory cache
let cache: {
  data: PlaygroupEvent[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getFirestoreData(): Promise<FirestoreDataResponse> {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log("📦 Using cached data");
      return {
        props: {
          eventData: cache.data,
        },
      };
    }

    console.log("🔥 Fetching fresh data from Firestore");
    const snapshot = await db.collection("playgroups").get();

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

      return plainData;
    });

    // Update cache
    cache = {
      data,
      timestamp: Date.now(),
    };

    return {
      props: {
        eventData: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error: any) {
    console.error("❌ Firebase error:", error);

    // If quota exceeded, try to return cached data
    if (error.code === 8 && cache) {
      console.log("⚠️ Quota exceeded, using cached data");
      return {
        props: {
          eventData: cache.data,
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
