import { NextResponse } from "next/server";
import { getFirestoreData } from "@/actions/getFirestoreData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const {
      props: { eventData },
    } = await getFirestoreData();

    return NextResponse.json({ eventData }, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/playgroups failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
