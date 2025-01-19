"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

  cookies().set(
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

  revalidatePath("/cotizar");
};
