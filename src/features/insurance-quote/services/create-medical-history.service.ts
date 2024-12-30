import prisma from "@/lib/prisma";
import { FormDataMedical } from "../types";

export async function createMedicalHistoryService(
  formMedical: FormDataMedical[],
  idProspect: number
) {
  try {
    const responses = JSON.parse(JSON.stringify(formMedical));
    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        responses,
        prospect: {
          connect: { id: idProspect },
        },
      },
    });
    return medicalHistory;
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error;
  }
}
