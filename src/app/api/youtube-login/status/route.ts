import {
  deleteYouTubeLoginFlow,
  getYouTubeLoginFlow,
} from "@/helpers/youtube-login";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const flow = id ? getYouTubeLoginFlow(id) : undefined;

  if (!id || !flow) {
    return NextResponse.json(
      { error: "Unknown or expired login flow." },
      { status: 404 },
    );
  }

  if (flow.error) {
    deleteYouTubeLoginFlow(id);
    return NextResponse.json({ error: flow.error }, { status: 500 });
  }

  if (flow.accessToken) {
    const accessToken = flow.accessToken;
    deleteYouTubeLoginFlow(id);
    return NextResponse.json({ status: "complete", accessToken });
  }

  return NextResponse.json({ status: "pending" }, { status: 202 });
}
