'use server';

import { google } from "googleapis";

const sheets = google.sheets({
  version: "v4",
  auth: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY,
});

async function GoogleSheets() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1-Y8tP2ovwWu8cDS0QiuL-C1IFiY3Xo_wlZJx55Xwvvo",
    range: "EarlyOn mock", // Adjust based on your actual sheet name and range
  });

  return res.data.values;
}

export default GoogleSheets;
