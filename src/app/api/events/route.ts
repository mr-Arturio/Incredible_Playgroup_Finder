import { NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function initAdmin() {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount as any) });
  }
  return getFirestore();
}

function toPlainDate(ts: any): string | null {
  try {
    if (!ts) return null;
    const d = ts instanceof Date ? ts : (ts as Timestamp).toDate();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return null;
  }
}

function normalizeGeopoint(gp: any) {
  if (!gp) return null;
  if (gp.latitude != null && gp.longitude != null) {
    return { latitude: gp.latitude, longitude: gp.longitude };
  }
  try {
    return { latitude: gp._latitude, longitude: gp._longitude };
  } catch {
    return null;
  }
}

function titleCaseLanguage(value: any): string {
  if (!value) return "";
  const pick = Array.isArray(value) ? value[0] : value;
  const s = String(pick).trim().toLowerCase();
  if (s.startsWith("en")) return "English";
  if (s.startsWith("fr")) return "French";
  if (s.startsWith("ar")) return "Arabic";
  if (s.startsWith("man") || s.startsWith("zh")) return "Mandarin";
  return pick;
}

export async function GET() {
  try {
    const db = initAdmin();
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
    }

    const snap = await db.collectionGroup("events").get();
    const data = snap.docs.map((d) => {
      const e: any = d.data();
      const date = toPlainDate(e.startTime);
      return {
        id: d.id,
        Address: e.address || e.Address || "",
        Age: e.ageRange || "",
        Area: e.area || "",
        Cancelled: !!e.cancelled,
        Coffee: e.coffee ?? e.Coffee ?? false,
        Day: e.day || "",
        FB: e.fb || "",
        Language: titleCaseLanguage(e.languages || e.Language),
        Location: e.locationName || "",
        Notes: e.notes_en || e.Notes || "",
        Notes_fr: e.notes_fr || e.Notes_fr || "",
        Organizer: e.organizerName || e.Organizer || "",
        Outdoor: e.outdoor ?? e.Outdoor ?? false,
        Parking: e.parking ?? e.Parking ?? false,
        Scale: e.scale ?? e.Scale ?? false,
        Service: e.serviceName || e.Service || "",
        Time: e.time || e.Time || "",
        Toys: e.toys ?? e.Toys ?? false,
        URL: e.website_en || e.URL || "",
        PG_URL: e.pg_en || e.PG_URL || "",
        WiFi: e.WiFi ?? false,
        Insta: e.insta || e.Insta || "",
        Eventbrite: e.eventbrite || e.Eventbrite || "",
        Registration: e.registration || e.Registration || "none",
        Registration_URL: e.registrationUrl || e.Registration_URL || "",
        eventDate: date || e.eventDate || "",
        geopoint: normalizeGeopoint(e.geopoint),
      };
    });

    return NextResponse.json({ eventData: data }, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/events failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
