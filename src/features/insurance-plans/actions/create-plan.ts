"use server";

import { prefix } from "@/shared/utils/constants";
import { createPlanService } from "../services/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices } from "../utils";
import { createPlanSchema } from "../schema/create-plan.schema";
import { FormState } from "@/shared/types";
import { simplifyZodErrors } from "@/shared/utils";

export const createPlan = async (formData: FormData): Promise<FormState> => {
  const rawFormData = Object.fromEntries(formData);
  const { data, success, error } = createPlanSchema.safeParse(rawFormData);

  if (!success) {
    return {
      success: false,
      message: "Error en la validación de los datos",
      inputErrors: simplifyZodErrors(error),
    };
  }

  const { prices, isMultiple, ...rest } = data;

  const planData = {
    ...rest,
    prices: prices ? flatPricesToJsonPrices(JSON.parse(prices)) : {},
  };

  await createPlanService(planData);

  redirect(`${prefix}/planes`);
};
