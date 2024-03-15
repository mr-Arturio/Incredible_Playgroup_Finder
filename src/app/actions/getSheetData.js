"use server";
import { google } from "googleapis";

function transformDataToObjects(data) {
  const headers = data[0];
  return data.slice(1).map(row => {
    return headers.reduce((accumulator, header, index) => {
      accumulator[header] = row[index];
      return accumulator;
    }, {});
  });
}

export async function getSheetData() {
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
    range: "A:K",
  });

  
  const transformedData = transformDataToObjects(data.data.values);

console.log(transformedData);

  return {
    props: {
      sheetData: transformedData, // Now returns data as objects
    },
  };
}
