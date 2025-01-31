"use server";

import { revalidatePath } from "next/cache";
import { deleteInsuranceService } from "../services/delete-insurance.service";
import { PrismaError } from "@/shared/errors/prisma";

export const deleteInsurance = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  try {
    await deleteInsuranceService(id);
    revalidatePath("/ctl/aseguradoras");

    return {
      success: true,
      message: "¡Aseguradora eliminada exitosamente!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al eliminar la aseguradora.",
    };
  }
};
