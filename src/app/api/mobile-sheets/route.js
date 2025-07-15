import { NextResponse } from "next/server";
import { getSheetData } from "../../../actions/getSheetData";
import { getCorsHeaders } from "../../../utils/cors";

export async function OPTIONS(request) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  try {
    const origin = request.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);

    const result = await getSheetData();
    const sheetData = result.props.sheetData;

    return NextResponse.json(
      {
        data: sheetData,
        meta: {
          count: sheetData ? sheetData.length : 0,
          sample: sheetData ? sheetData[0] : null,
        },
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json(
      { error: "Failed to load sheet data" },
      { status: 500 }
    );
  }
}