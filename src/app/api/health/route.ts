import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    service: "toolkit-next-ts-starter",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
