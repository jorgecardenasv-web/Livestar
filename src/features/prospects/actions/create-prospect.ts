"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createProspect = async (formData: any) => {
  const {
    name,
    gender,
    age,
    postalCode,
    protectWho,
    whatsapp,
    email,
    ...additionalInfo
  } = formData;

  const cookieStore = await cookies();
  cookieStore.set(
    "prospect",
    JSON.stringify({
      name,
      gender,
      age,
      postalCode,
      protectWho,
      whatsapp,
      email,
      additionalInfo,
    })
  );

  redirect("/cotizar/planes");
};
