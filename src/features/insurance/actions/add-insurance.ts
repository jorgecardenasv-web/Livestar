"use server";

import { saveImage } from "@/shared/services/upload-image.service";
import { addInsuranceSchema } from "../schemas/add-insurance";
import { simplifyZodErrors } from "@/shared/utils";
import { addInsuranceService } from "../services/add-insurance.service";
import { revalidatePath } from "next/cache";

export async function addInsurance(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const result = addInsuranceSchema.safeParse(rawFormData);

  if (!result.success) {
    const simplifiedErrors = simplifyZodErrors(result.error);
    return {
      errors: simplifiedErrors,
    };
  }

  const { name, logo } = result.data;

  const filename = await saveImage(logo);

  await addInsuranceService({
    name,
    logo: `/api/images/${filename}`,
  });

  revalidatePath("/ctl/aseguradoras");

  return {
    errors: null,
  };
}
