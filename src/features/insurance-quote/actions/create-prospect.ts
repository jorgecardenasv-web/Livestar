"use server";

import { redirect } from "next/navigation";
import { createProspectService } from "../services/create-prospect.service";
import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";

export const createProspect = async (formData: any) => {
  const advisorId = await getAdvisorWithLeastProspectsService();

  if (!advisorId) {
    throw new Error("No hay asesores disponibles para asignar al prospecto.");
  }

  const prospect = await createProspectService(formData, advisorId);

  redirect("/comparador-cotizador-seguros-salud");
};
