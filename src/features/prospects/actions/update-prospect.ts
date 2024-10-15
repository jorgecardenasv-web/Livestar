"use server";

import { prefix } from "@/shared/utils/constants";
import { revalidatePath } from "next/cache";
import { updateProspectService } from "../services/update-prospect.service";
import { parsedFormDataAge } from "@/shared/utils";

export const updateProspect = async (
  prospectId: string,
  formData: FormData
) => {
  const rawFormData = Object.fromEntries(formData);

  const parsedFormData = parsedFormDataAge(rawFormData);

  await updateProspectService(prospectId, parsedFormData);

  revalidatePath(`${prefix}/prospectos/${prospectId}`);
};
