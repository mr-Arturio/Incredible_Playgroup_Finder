"use server";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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

export async function getFirestoreData() {
  try {
    const snapshot = await db.collection("playgroups").get();

    const data = snapshot.docs.map((doc) => {
      const plainData = doc.data();

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

    return {
      props: {
        eventData: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error) {
    console.error("❌ Firebase error:", error);
    return {
      props: {
        eventData: [],
      },
    };
  }
}

