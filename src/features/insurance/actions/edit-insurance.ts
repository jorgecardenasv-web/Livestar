"use server";

import { saveImage } from "@/shared/services/upload-image.service";
import { simplifyZodErrors } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { editInsuranceService } from "../services/edit-insurance.service";
import { editInsuranceSchema } from "../schemas/edit-insurance";

export async function editInsurance(
  insuranceId: string,
  prevState: any,
  formData: FormData
) {
  
  const rawFormData = Object.fromEntries(formData.entries());

  console.log(rawFormData);
  

  const result = editInsuranceSchema.safeParse(rawFormData);

  if (!result.success) {
    const simplifiedErrors = simplifyZodErrors(result.error);
    console.log(simplifiedErrors);
    
    return {
      errors: simplifiedErrors,
    };
  }

  const { name, logo, logo_url } = result.data;

  try {
    const filename = logo ? await saveImage(logo) : logo_url;

    await editInsuranceService({
      id: insuranceId,
      name,
      logo: `/api/images/${filename}`,
    });

    revalidatePath("/ctl/aseguradoras");
  } catch (error) {
    console.error("Error al añadir la aseguradora:", error);
    return {
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
