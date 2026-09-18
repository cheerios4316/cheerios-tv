import { startYouTubeLogin } from "@/helpers/youtube-login";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    return NextResponse.json(await startYouTubeLogin());
  } catch (error) {
    console.error("Could not start YouTube login:", error);
    return NextResponse.json(
      { error: "Could not start YouTube login." },
      { status: 500 },
    );
  }
}
