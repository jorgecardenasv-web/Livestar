"use server";

import { cookies } from "next/headers";

export const saveProspectInCookies = async (prevState: any, formData: any) => {
  cookies().set(
    "prospect",
    JSON.stringify(formData)
  );

  return Object.fromEntries(formData)
};
