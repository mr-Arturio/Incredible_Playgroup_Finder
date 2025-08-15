require("dotenv").config({ path: ".env.local" });

const { google } = require("googleapis");
const admin = require("firebase-admin");
const { GeoPoint, FieldValue } = require("firebase-admin/firestore");

// ------- Config (adjustable via CLI args) -------
const ORGANIZER_NAME = process.env.MIGRATE_ORGANIZER_NAME || "Andrew Fleck CS";
const ADMIN_EMAIL =
  process.env.MIGRATE_ADMIN_EMAIL || "organizer-admin@example.com"; // mock
const MONTHS_AHEAD = parseInt(process.env.MIGRATE_MONTHS_AHEAD || "1", 10);
const TIME_ZONE = process.env.MIGRATE_TIME_ZONE || "America/Toronto";
const SHEET_RANGE = process.env.MIGRATE_SHEET_RANGE || "MainSheet!A1:AH";

const requiredEnv = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "GOOGLE_SHEETS_CLIENT_EMAIL",
  "GOOGLE_SHEETS_PRIVATE_KEY",
  "GOOGLE_SHEET_ID",
];

const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `Missing required env vars: ${missing.join(", ")}. Add them to .env.local`
  );
  process.exit(1);
}

// Initialize Firebase Admin (emulator-aware)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

// ---------- Utilities ----------
function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

function parseBoolean(val) {
  if (typeof val === "boolean") return val;
  if (val == null) return false;
  const s = String(val).trim().toLowerCase();
  return s === "true" || s === "yes" || s === "y" || s === "1";
}

function toNumberOrNull(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function splitLanguages(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function parseTimeRange(timeStr) {
  // Accept formats: "HH:mm", "HH:mm-HH:mm", "HH:mm - HH:mm"
  if (!timeStr) return { start: { h: 9, m: 0 }, end: { h: 10, m: 0 } };
  const parts = String(timeStr).split("-");
  const [sh, sm] = parts[0]
    .trim()
    .split(":")
    .map((n) => parseInt(n, 10));
  let eh = sh + 1;
  let em = sm || 0;
  if (parts[1]) {
    const [h2, m2] = parts[1]
      .trim()
      .split(":")
      .map((n) => parseInt(n, 10));
    if (Number.isFinite(h2)) eh = h2;
    if (Number.isFinite(m2)) em = m2;
  }
  return { start: { h: sh || 9, m: sm || 0 }, end: { h: eh, m: em } };
}

const DAY_INDEX = {
  sunday: 0,
  sun: 0,
  monday: 1,
  mon: 1,
  tuesday: 2,
  tue: 2,
  tues: 2,
  wednesday: 3,
  wed: 3,
  thursday: 4,
  thu: 4,
  thur: 4,
  thurs: 4,
  friday: 5,
  fri: 5,
  saturday: 6,
  sat: 6,
};

function parseDayIndex(day) {
  if (!day) return null;
  const key = String(day).toLowerCase().replace(/\./g, "").trim();
  return DAY_INDEX[key] ?? null;
}

function* upcomingDatesForDay(startDate, monthsAhead, weekdayIndex) {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + monthsAhead);
  // find first occurrence of weekdayIndex on/after start
  const first = new Date(startDate);
  const delta = (7 + weekdayIndex - first.getDay()) % 7;
  first.setDate(first.getDate() + delta);
  for (let d = new Date(first); d <= endDate; d.setDate(d.getDate() + 7)) {
    yield new Date(d);
  }
}

// DST-safe instant for local wall time in a given time zone
function makeZonedDate(dateOnly, { h, m }, timeZone) {
  const base = new Date(
    Date.UTC(
      dateOnly.getFullYear(),
      dateOnly.getMonth(),
      dateOnly.getDate(),
      h,
      m,
      0
    )
  );
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(base).map((p) => [p.type, p.value])
  );
  const dh = parseInt(parts.hour, 10) - h;
  const dm = parseInt(parts.minute, 10) - m;
  return new Date(base.getTime() - (dh * 60 + dm) * 60 * 1000);
}

// ---------- Core Migration ----------
async function loadSheetRows() {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  const sheets = google.sheets({ version: "v4", auth: jwtClient });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: SHEET_RANGE,
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  const rows = res.data.values || [];
  if (!rows.length) return { headers: [], rows: [] };
  const headers = rows[0];
  return { headers, rows: rows.slice(1) };
}

function rowToObject(row, headers) {
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = row[i];
  });
  return obj;
}

function parseRegistration(val) {
  const s = String(val || "")
    .trim()
    .toLowerCase();
  if (["required", "mandatory", "yes", "y"].includes(s)) return "required";
  if (["optional", "opt", "maybe"].includes(s)) return "optional";
  return "none";
}

function pickServiceDefaults(entry) {
  return {
    name_en: entry.Service || "",
    name_fr: entry.Service_fr || "",
    ageRange: entry.Age || "",
    languages: splitLanguages(entry.Language),
    area: entry.Area || "",
    urls: {
      website_en: entry.URL || "",
      website_fr: entry.URL_fr || "",
      pg_en: entry.PG_URL || "",
      pg_fr: entry.PG_URL_fr || "",
      fb: entry.FB || "",
      insta: entry.Insta || "",
      eventbrite: entry.Eventbrite || "",
    },
    notes_en: entry.Notes || "",
    notes_fr: entry.Notes_fr || "",
    paused: parseBoolean(entry.Paused),
  };
}

function pickOffering(entry) {
  const lat = toNumberOrNull(entry.lat);
  const lng = toNumberOrNull(entry.lng);
  return {
    locationName: entry.Location || "",
    address: entry.Address || "",
    area: entry.Area || "",
    geopoint: lat != null && lng != null ? new GeoPoint(lat, lng) : null,
    day: entry.Day || "",
    time: entry.Time || "",
    repeats: (entry.Repeats || "").toString().toLowerCase().includes("week")
      ? "weekly"
      : "none",
    paused: parseBoolean(entry.Paused),
    // Flags are offering-specific
    coffee: parseBoolean(entry.Coffee),
    parking: parseBoolean(entry.Parking),
    toys: parseBoolean(entry.Toys),
    outdoor: parseBoolean(entry.Outdoor),
    scale: parseBoolean(entry.Scale),
    registration: parseRegistration(entry.Registration),
    registrationUrl: entry.Registration_URL || "",
  };
}

function offeringKey(ofr) {
  const gp = ofr.geopoint
    ? `${ofr.geopoint.latitude},${ofr.geopoint.longitude}`
    : "";
  return [
    ofr.locationName,
    ofr.address,
    gp,
    ofr.area,
    ofr.day,
    ofr.time,
    ofr.repeats,
  ]
    .map((s) => String(s || "").trim())
    .join("|#|");
}

async function ensureOrganizer(name_en, name_fr) {
  const orgId = slugify(name_en);
  const ref = db.collection("organizers").doc(orgId);
  const payload = {
    name_en,
    name_fr: name_fr || "",
    slug: orgId,
    adminEmails: [ADMIN_EMAIL],
    active: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await ref.set(payload, { merge: true });
  return { ref, id: orgId };
}

async function ensureService(orgRef, defaults) {
  const serviceId = slugify(defaults.name_en || defaults.name_fr || "service");
  const ref = orgRef.collection("services").doc(serviceId);
  const payload = {
    orgId: orgRef.id,
    ...defaults,
    isActive: !defaults.paused,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await ref.set(payload, { merge: true });
  return { ref, id: serviceId };
}

async function ensureOffering(serviceRef, ofr) {
  const id = slugify(
    `${ofr.locationName}-${ofr.day}-${ofr.time}-${ofr.repeats}`.replace(
      /\|/g,
      "-"
    )
  );
  const ref = serviceRef.collection("offerings").doc(id);
  const payload = {
    orgId: serviceRef.parent.parent.id,
    serviceId: serviceRef.id,
    ...ofr,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await ref.set(payload, { merge: true });
  return { ref, id };
}

// Optionally clear existing events under an offering to avoid duplicates
async function clearExistingEvents(offeringRef) {
  if (
    String(process.env.MIGRATE_CLEAR_EVENTS || "true").toLowerCase() !== "true"
  ) {
    return;
  }
  const snap = await offeringRef.collection("events").get();
  if (snap.empty) return;
  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

async function commitInChunks(ops) {
  let count = 0;
  let batch = db.batch();
  for (const op of ops) {
    op(batch);
    count += 1;
    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  await batch.commit();
}

async function createEventDocs(offeringRef, context) {
  const {
    organizerName,
    orgId,
    serviceId,
    offeringId,
    serviceName,
    ofr,
    monthsAhead,
    timeZone,
    entry,
  } = context;
  const { start, end } = parseTimeRange(ofr.time);

  const writes = [];

  // One-off dated event from sheet
  if (
    entry.eventDate &&
    !String(entry.eventDate).toLowerCase().includes("invalid")
  ) {
    const parts = String(entry.eventDate).split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const base = new Date(y, m - 1, d);
      const startDate = makeZonedDate(base, start, timeZone);
      const endDate = makeZonedDate(base, end, timeZone);
      const evRef = offeringRef.collection("events").doc();
      const dayBucket = `${y}-${String(m).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      writes.push((b) =>
        b.set(evRef, {
          orgId,
          serviceId,
          offeringId,
          startTime: startDate,
          endTime: endDate,
          cancelled: parseBoolean(entry.Cancelled),
          organizerName,
          serviceName,
          locationName: ofr.locationName,
          area: ofr.area,
          languages: context.serviceDefaults.languages || [],
          ageRange: context.serviceDefaults.ageRange || "",
          geopoint: ofr.geopoint || null,
          address: ofr.address || "",
          day: ofr.day,
          eventDate: dayBucket,
          dayBucket,
          time: ofr.time,
          // Denormalized offering flags (lowercase)
          coffee: !!ofr.coffee,
          parking: !!ofr.parking,
          toys: !!ofr.toys,
          outdoor: !!ofr.outdoor,
          scale: !!ofr.scale,
          registration: ofr.registration || "none",
          registrationUrl: ofr.registrationUrl || "",
          // Denormalized notes and urls from service defaults
          notes_en: context.serviceDefaults.notes_en || "",
          notes_fr: context.serviceDefaults.notes_fr || "",
          website_en: context.serviceDefaults.urls?.website_en || "",
          website_fr: context.serviceDefaults.urls?.website_fr || "",
          pg_en: context.serviceDefaults.urls?.pg_en || "",
          pg_fr: context.serviceDefaults.urls?.pg_fr || "",
          fb: context.serviceDefaults.urls?.fb || "",
          insta: context.serviceDefaults.urls?.insta || "",
          eventbrite: context.serviceDefaults.urls?.eventbrite || "",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        })
      );
    }
  }

  // Recurring weekly events for the next N months
  if (ofr.repeats === "weekly" && !ofr.paused) {
    const weekdayIndex = parseDayIndex(ofr.day);
    if (weekdayIndex != null) {
      const today = new Date();
      for (const dateOnly of upcomingDatesForDay(
        today,
        monthsAhead,
        weekdayIndex
      )) {
        const startDate = makeZonedDate(dateOnly, start, timeZone);
        const endDate = makeZonedDate(dateOnly, end, timeZone);
        const y = dateOnly.getFullYear();
        const m = dateOnly.getMonth() + 1;
        const d = dateOnly.getDate();
        const evRef = offeringRef.collection("events").doc();
        const dayBucket = `${y}-${String(m).padStart(2, "0")}-${String(
          d
        ).padStart(2, "0")}`;
        writes.push((b) =>
          b.set(evRef, {
            orgId,
            serviceId,
            offeringId,
            startTime: startDate,
            endTime: endDate,
            cancelled: false,
            organizerName,
            serviceName,
            locationName: ofr.locationName,
            area: ofr.area,
            languages: context.serviceDefaults.languages || [],
            ageRange: context.serviceDefaults.ageRange || "",
            geopoint: ofr.geopoint || null,
            address: ofr.address || "",
            day: ofr.day,
            eventDate: dayBucket,
            dayBucket,
            time: ofr.time,
            coffee: !!ofr.coffee,
            parking: !!ofr.parking,
            toys: !!ofr.toys,
            outdoor: !!ofr.outdoor,
            scale: !!ofr.scale,
            registration: ofr.registration || "none",
            registrationUrl: ofr.registrationUrl || "",
            notes_en: context.serviceDefaults.notes_en || "",
            notes_fr: context.serviceDefaults.notes_fr || "",
            website_en: context.serviceDefaults.urls?.website_en || "",
            website_fr: context.serviceDefaults.urls?.website_fr || "",
            pg_en: context.serviceDefaults.urls?.pg_en || "",
            pg_fr: context.serviceDefaults.urls?.pg_fr || "",
            fb: context.serviceDefaults.urls?.fb || "",
            insta: context.serviceDefaults.urls?.insta || "",
            eventbrite: context.serviceDefaults.urls?.eventbrite || "",
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          })
        );
      }
    }
  }

  await commitInChunks(writes);
}

async function migrateSingleOrganizer() {
  console.log(`➡️ Starting migration for organizer: ${ORGANIZER_NAME}`);
  const { headers, rows } = await loadSheetRows();
  if (!headers.length) {
    console.log("No data found in sheet.");
    return;
  }

  const entries = rows
    .map((r) => rowToObject(r, headers))
    .filter((e) => String(e.Organizer || "").trim() === ORGANIZER_NAME);

  if (!entries.length) {
    console.log(`No rows found for organizer '${ORGANIZER_NAME}'.`);
    return;
  }

  const organizer_fr = entries.find((e) => e.Organizer_fr)?.Organizer_fr || "";
  const { ref: orgRef } = await ensureOrganizer(ORGANIZER_NAME, organizer_fr);

  // Group rows by service
  const serviceKey = (e) => `${e.Service}||${e.Service_fr}`;
  const servicesMap = new Map();
  for (const e of entries) {
    const key = serviceKey(e);
    if (!servicesMap.has(key)) servicesMap.set(key, []);
    servicesMap.get(key).push(e);
  }

  for (const [key, serviceRows] of servicesMap.entries()) {
    const sample = serviceRows[0];
    const serviceDefaults = pickServiceDefaults(sample);
    const { ref: serviceRef, id: serviceId } = await ensureService(
      orgRef,
      serviceDefaults
    );

    // Group into offerings
    const offeringsMap = new Map();
    for (const row of serviceRows) {
      const ofr = pickOffering(row);
      const ok = offeringKey(ofr);
      if (!offeringsMap.has(ok)) offeringsMap.set(ok, { ofr, rows: [] });
      offeringsMap.get(ok).rows.push(row);
    }

    for (const { ofr, rows } of offeringsMap.values()) {
      const { ref: offeringRef, id: offeringId } = await ensureOffering(
        serviceRef,
        ofr
      );
      await clearExistingEvents(offeringRef);
      // Create events for each representative row (one-off) and weekly generators
      for (const entry of rows) {
        await createEventDocs(offeringRef, {
          organizerName: ORGANIZER_NAME,
          orgId: orgRef.id,
          serviceId,
          offeringId,
          serviceName: serviceDefaults.name_en || serviceDefaults.name_fr,
          ofr,
          monthsAhead: MONTHS_AHEAD,
          timeZone: TIME_ZONE,
          entry,
          serviceDefaults,
        });
      }
    }
  }

  console.log("✅ Migration complete for:", ORGANIZER_NAME);
}

migrateSingleOrganizer().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
