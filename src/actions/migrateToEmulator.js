require("dotenv").config({ path: ".env.local" });

const { google } = require("googleapis");
const fetch = require("node-fetch");

const {
  GOOGLE_SHEETS_CLIENT_EMAIL,
  GOOGLE_SHEETS_PRIVATE_KEY,
  GOOGLE_SHEETS_PROJECT_ID,
  GOOGLE_SHEET_ID,
} = process.env;

const FIRESTORE_EMULATOR_URL =
  "http://127.0.0.1:8080/v1/projects/incredible-playgroup-finder/databases/(default)/documents/playgroups";

function formatForFirestore(row, headers) {
  const doc = {};
  let lat = null;
  let lng = null;

  headers.forEach((key, index) => {
    let value = row[index];

    if (value === "yes") value = true;
    if (value === "no") value = false;

    if (key.toLowerCase() === "lat") lat = parseFloat(value);
    else if (key.toLowerCase() === "lng") lng = parseFloat(value);
    else if (value !== undefined && value !== "") {
      if (typeof value === "boolean") {
        doc[key] = { booleanValue: value };
      } else if (!isNaN(value) && value !== "") {
        doc[key] = { doubleValue: parseFloat(value) };
      } else {
        doc[key] = { stringValue: value };
      }
    }
  });

  if (lat !== null && lng !== null) {
    doc.geopoint = {
      geoPointValue: {
        latitude: lat,
        longitude: lng,
      },
    };
  }

  return { fields: doc };
}

async function runMigration() {
  const jwtClient = new google.auth.JWT(
    GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  const sheets = google.sheets({ version: "v4", auth: jwtClient });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "MainSheet!A1:Z", // adjust sheet name if needed
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) {
    console.log("No data found.");
    return;
  }

  const headers = rows[0];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const payload = formatForFirestore(row, headers);

    try {
      const res = await fetch(FIRESTORE_EMULATOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ Failed for row ${i + 1}: ${errorText}`);
      } else {
        const json = await res.json();
        console.log(`✅ Row ${i + 1} uploaded: ${json.name}`);
      }
    } catch (err) {
      console.error(`❌ Error on row ${i + 1}: ${err.message}`);
    }
  }
}

runMigration();
