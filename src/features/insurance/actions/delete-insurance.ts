"use server";

import { revalidatePath } from "next/cache";
import { deleteInsuranceService } from "../services/delete-insurance.service";

export const deleteInsurance = async (insuranceId: string) => {
  try {
    await deleteInsuranceService(insuranceId);
    revalidatePath("/ctl/aseguradoras");
  } catch (error) {
    return {
      error,
    };
  }
};
