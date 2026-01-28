import { NextResponse } from "next/server";
import { clearQuoteCookies } from "@/features/plans/actions/set-cookies";

export async function POST() {
  await clearQuoteCookies();
  return NextResponse.json({ success: true });
}
