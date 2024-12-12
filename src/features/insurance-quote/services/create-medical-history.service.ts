import prisma from "@/lib/prisma";
import { FormDataMedical } from "../types";

export async function createMedicalHistoryService(
  formMedical: FormDataMedical[],
  idProspect: number
) {
  try {
    const responses = JSON.parse(JSON.stringify(formMedical));
    console.log(responses);
    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        responses,
        prospect: {
          connect: { id: idProspect },
        },
      },
    });
    console.log("Historial médico creado con éxito");
    return medicalHistory;
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error;
  }
}
