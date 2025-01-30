"use server";

import { saveImage } from "@/shared/services/upload-image.service";
// import { updateInsuranceSchema } from "../schemas/update-insurance";
import { simplifyZodErrors } from "@/shared/utils";
// import { updateInsuranceService } from "../services/update-insurance.service";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { updateInsuranceService } from "../services/update-insurence.service";
import { createInsuranceSchema } from "../schemas/create-insurance";

export async function updateInsurance(
  id: string,
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());

    const result = createInsuranceSchema.safeParse(rawFormData);

    if (!result.success) {
      const simplifiedErrors = simplifyZodErrors(result?.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }
    const { name, logo } = result.data;
    const filename = await saveImage(logo);

    await updateInsuranceService(id, {
      name,
      logo: `${filename}`,
    });
    revalidatePath("/ctl/aseguradoras");
    return {
      success: true,
      message: "¡Aseguradora actualizada exitosamente!",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error inesperado.",
    };
  }
}
