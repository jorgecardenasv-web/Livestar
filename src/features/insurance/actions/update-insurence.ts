"use server";

import { saveImage } from "@/shared/services/upload-image.service";
import { simplifyZodErrors } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { updateInsuranceService } from "../services/update-insurence.service";
import { PrismaError } from "@/shared/errors/prisma";
import { updateInsuranceSchema } from "../schemas/update-insurance";

export async function updateInsurance(
  id: string,
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    const logo = formData.get("logo");
    const name = formData.get("name") as string;

    let logoFilename = undefined;
    if (logo instanceof File && logo.size > 0) {
      logoFilename = await saveImage(logo);
    } else if (typeof logo === "string" && logo.trim() !== "") {
      logoFilename = logo;
    }

    const result = updateInsuranceSchema.safeParse({
      name,
      logo: logoFilename,
    });

    if (!result.success) {
      const simplifiedErrors = simplifyZodErrors(result?.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    // Construir objeto de actualización solo con los campos que cambiaron
    const updateData: Record<string, string> = {};
    if (name) updateData.name = name;
    if (logoFilename) updateData.logo = logoFilename;

    await updateInsuranceService(id, updateData);

    revalidatePath("/ctl/aseguradoras");
    return {
      success: true,
      message: "¡Aseguradora actualizada exitosamente!",
    };
  } catch (error) {
    console.error("Error en updateInsurance:", error);
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar la aseguradora.",
    };
  }
}
