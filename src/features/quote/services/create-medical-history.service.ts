import prisma from "@/lib/prisma";
import { FormDataMedical } from "../types";
import { handlePrismaError } from "@/shared/errors/prisma";

export async function createMedicalHistoryService(
  formMedical: FormDataMedical[],
  prospectId: string
) {
  try {
    const responses = JSON.parse(JSON.stringify(formMedical));
    return await prisma.medicalHistory.create({
      data: {
        responses,
        prospect: {
          connect: { id: prospectId },
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}
