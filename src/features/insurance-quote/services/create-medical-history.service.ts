import prisma from "@/lib/prisma";
import { FormDataMedical } from "../types";

export async function createMedicalHistoryService(
  formMedical: FormDataMedical[],
  prospectId: string
) {
  try {
    const responses = JSON.parse(JSON.stringify(formMedical));
    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        responses,
        prospect: {
          connect: { id: prospectId },
        },
      },
    });
    return medicalHistory;
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error;
  }
}
