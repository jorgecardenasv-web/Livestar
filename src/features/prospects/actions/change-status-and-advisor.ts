'use server'

import { z } from "zod";
import { simplifyZodErrors } from "@/shared/utils";
import { changeStatusAndAdvisorService } from "../services/change-status-and-advisor.service";
import { ProspectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const ChangeStatusAndAdvisorSchema = z.object({
  prospectId: z.string(),
  advisorId: z.string(),
  status: z.string(),
});

export const changeStatusAndAdvisor = async (
  prospectId: string,
  prevState: any,
  formData: FormData
) => {
  const advisorId = formData.get("userId") as string;
  const status = formData.get("status") as ProspectStatus;

  const zodResult = ChangeStatusAndAdvisorSchema.safeParse({
    prospectId,
    advisorId,
    status,
  });

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);
    return {
      errors: simplifiedErrors,
    };
  }
  
  const prospect = await changeStatusAndAdvisorService({
    prospectId,
    advisorId,
    status
  })

  if (!prospect) {
    return {
      errors: {
        general: "Error al crear el asesor",
      },
    };
  }
  
  revalidatePath("/prospects");
  return {
    errors: null,
  };
};