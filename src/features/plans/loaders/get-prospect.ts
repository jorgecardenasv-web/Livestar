"use server";

import { cookies } from "next/headers";

export async function getProspect() {
  const cookieStore = cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};
  return prospect;
}
