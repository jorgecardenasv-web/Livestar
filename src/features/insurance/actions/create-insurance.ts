"use server";

import { convertToBlob } from "@/shared/services/blob-image.service";
import { createInsuranceSchema } from "../schemas/create-insurance";
import { simplifyZodErrors } from "@/shared/utils";
import { createInsuranceService } from "../services/create-insurance.service";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export async function createInsurance(
  id: string,
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const result = createInsuranceSchema.safeParse(rawFormData);

    if (!result.success) {
      const simplifiedErrors = simplifyZodErrors(result.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    const { name, logo } = result.data;

    const logoBlob = await convertToBlob(logo);

    await createInsuranceService({
      name,
      logo: logoBlob,
    });

    revalidatePath("/ctl/aseguradoras");

    return {
      success: true,
      message: "¡Aseguradora creada exitosamente!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear la aseguradora.",
    };
  }
}
