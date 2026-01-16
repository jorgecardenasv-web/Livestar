"use server";

import { cookies } from "next/headers";

export async function getProspect() {
  const cookieStore = await cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};

  let { protectWho, additionalInfo, ...rest } = prospect;

  // Si additionalInfo es un string, parsearlo
  if (typeof additionalInfo === 'string') {
    try {
      additionalInfo = JSON.parse(additionalInfo);
    } catch (e) {
      console.error("Error parsing additionalInfo in getProspect:", e);
    }
  }

  // Si additionalInfo tiene una propiedad additionalInfo anidada, desenvolverla
  if (additionalInfo && additionalInfo.additionalInfo) {
    additionalInfo = additionalInfo.additionalInfo;
  }

  return {
    prospect: rest,
    protectWho,
    additionalInfo,
  };
}
