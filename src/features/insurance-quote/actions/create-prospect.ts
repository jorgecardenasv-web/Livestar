"use server";

import { redirect } from "next/navigation";
import { createProspectService } from "../services/create-prospect.service";
import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createProspect = async (formData: any) => {
  const advisorId = await getAdvisorWithLeastProspectsService();

  if (!advisorId) {
    throw new Error("No hay asesores disponibles para asignar al prospecto.");
  }

  const prospect = await createProspectService(formData, advisorId!);

  cookies().set(
    "prospect",
    JSON.stringify({
      id: prospect.id,
      postalCode: prospect.postalCode,
      age: prospect.age,
      additionalInfo: prospect.additionalInfo,
      protectWho: prospect.protectWho,
    })
  );

  revalidatePath("/cotizar");
};
