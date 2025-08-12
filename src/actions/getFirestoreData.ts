"use server";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { PlaygroupEvent, FirestoreDataResponse } from "../types";

const requiredEnv = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `Missing Firebase Admin env vars: ${missing.join(
      ", "
    )}. Ensure these are set in Vercel project settings.`
  );
}

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

// Prefer explicit emulator env; no-op on Vercel
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
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return {
        props: {
          eventData: JSON.parse(JSON.stringify(cache.data)),
        },
      };
    }

    const snapshot = await db.collection("playgroups").get();

    const invalidDates: any[] = [];
    const invalidTimes: any[] = [];

    const data: PlaygroupEvent[] = snapshot.docs.map((doc) => {
      const plainData = doc.data() as PlaygroupEvent;

      if (plainData.geopoint?.latitude && plainData.geopoint?.longitude) {
        plainData.geopoint = {
          latitude: plainData.geopoint.latitude,
          longitude: plainData.geopoint.longitude,
        };
      }

      plainData.id = doc.id;

      if (
        typeof plainData.eventDate !== "string" ||
        !plainData.eventDate.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        invalidDates.push(plainData);
      }

      if (
        typeof plainData.Time !== "string" ||
        !/^\d{2}:\d{2}(\s*-\s*\d{2}:\d{2})?$/.test(plainData.Time.trim())
      ) {
        invalidTimes.push(plainData);
      }

      return plainData;
    });

    cache = { data, timestamp: Date.now() };

    return {
      props: { eventData: JSON.parse(JSON.stringify(cache.data)) },
    };
  } catch (error: any) {
    console.error("❌ Firebase error:", error);

    if (error.code === 8 && cache) {
      return {
        props: { eventData: JSON.parse(JSON.stringify(cache.data)) },
      };
    }

    return {
      props: { eventData: [] },
    };
  }
}
