"use server";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { PlaygroupEvent } from "../types";

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

// Connect to Firestore Emulator if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
}

/**
 * Get events for a specific organizer
 */
export async function getOrganizerEvents(
  organizerName: string
): Promise<PlaygroupEvent[]> {
  try {
    console.log("🔍 Fetching events for organizer:", organizerName);

    const snapshot = await db
      .collection("playgroups")
      .where("Organizer", "==", organizerName)
      .get();

    const events: PlaygroupEvent[] = snapshot.docs.map((doc) => {
      const data = doc.data() as PlaygroupEvent;
      return {
        ...data,
        id: doc.id,
      };
    });

    console.log(
      `📊 Found ${events.length} events for organizer ${organizerName}`
    );
    return events;
  } catch (error) {
    console.error("❌ Error fetching organizer events:", error);
    throw new Error("Failed to fetch organizer events");
  }
}

/**
 * Get a single event by ID
 */
export async function getEventById(
  eventId: string
): Promise<PlaygroupEvent | null> {
  try {
    console.log("🔍 Fetching event by ID:", eventId);

    const doc = await db.collection("playgroups").doc(eventId).get();

    if (!doc.exists) {
      console.log("❌ Event not found:", eventId);
      return null;
    }

    const data = doc.data() as PlaygroupEvent;
    return {
      ...data,
      id: doc.id,
    };
  } catch (error) {
    console.error("❌ Error fetching event by ID:", error);
    throw new Error("Failed to fetch event");
  }
}

/**
 * Create a new event
 */
export async function createEvent(
  eventData: Partial<PlaygroupEvent>
): Promise<string> {
  try {
    console.log("➕ Creating new event:", eventData.Service);

    // Add default values
    const newEvent = {
      ...eventData,
      approved: false, // Default to not approved
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await db.collection("playgroups").add(newEvent);

    console.log("✅ Event created successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

/**
 * Update an existing event
 */
export async function updateEvent(
  eventId: string,
  eventData: Partial<PlaygroupEvent>
): Promise<void> {
  try {
    console.log("✏️ Updating event:", eventId);

    const updateData = {
      ...eventData,
      updatedAt: new Date(),
    };

    await db.collection("playgroups").doc(eventId).update(updateData);

    console.log("✅ Event updated successfully:", eventId);
  } catch (error) {
    console.error("❌ Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

/**
 * Delete an event
 */
export async function deleteEvent(eventId: string): Promise<void> {
  try {
    console.log("🗑️ Deleting event:", eventId);

    await db.collection("playgroups").doc(eventId).delete();

    console.log("✅ Event deleted successfully:", eventId);
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
}

/**
 * Check if user is authorized to access an event
 */
export async function isAuthorizedForEvent(
  organizerName: string,
  eventId: string
): Promise<boolean> {
  try {
    const event = await getEventById(eventId);

    if (!event) {
      return false;
    }

    return event.Organizer === organizerName;
  } catch (error) {
    console.error("❌ Error checking authorization:", error);
    return false;
  }
}
