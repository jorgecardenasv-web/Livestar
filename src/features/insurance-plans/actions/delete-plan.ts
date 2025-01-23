"use server";

import { revalidatePath } from "next/cache";
import { deletePlanService } from "../services/delete-plan.service";
import { FormState } from "@/shared/types";

export const deletePlan = async (planId: string): Promise<FormState> => {
  console.log("Deleting plan with id: ", planId);

  await deletePlanService(planId);

  revalidatePath("/planes");

  return {
    success: true,
    message: "Plan eliminado correctamente",
  };
};
