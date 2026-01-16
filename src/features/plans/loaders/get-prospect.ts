"use server";

import { cookies } from "next/headers";

export async function getProspect() {
  const cookieStore = await cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};

  const { protectWho, additionalInfo, ...rest } = prospect;

  return {
    prospect: rest,
    protectWho,
    additionalInfo,
  };
}
