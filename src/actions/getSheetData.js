"use server";
import { google } from "googleapis";
import { transformDataToObjects } from "../utils/transformDataToObjects";
import { TTLCache } from "../utils/TTLCache"; // Import the TTLCache class

const sheetCache = new TTLCache(1000 * 60 * 15); // Cache TTL of 15 minutes

export async function getSheetData() {
  const cacheKey = "sheetData";

  // Try to get cached data
  let cachedData = sheetCache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached data");
    return {
      props: {
        sheetData: cachedData,
      },
    };
  } else {
    console.log("Cache miss: Fetching new data");
  }

  try {
    const glAuth = await google.auth.getClient({
      projectId: process.env.GOOGLE_SHEETS_PROJECT_ID,
      credentials: {
        type: "service_account",
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "MainSheet!A:AL",
    });

    const transformedData = transformDataToObjects(data.data.values);

    // Cache the data
    if (transformedData) {
      // Only cache if data is not null
      sheetCache.set(cacheKey, transformedData);
      console.log("New data cached");
      // console.log(transformedData);
    }

    return {
      props: {
        sheetData: transformedData, // Now returns data as objects
      },
    };
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return {
      props: {
        sheetData: null,
      },
    };
  }
}
