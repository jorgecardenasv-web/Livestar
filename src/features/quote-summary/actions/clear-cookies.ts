"use server";

import { clearQuoteCookies } from "@/features/plans/actions/set-cookies";

export async function clearCookiesAction() {
  await clearQuoteCookies();
  return { success: true };
}
