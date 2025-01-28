"use server";

import { prefix } from "@/shared/utils/constants";
import { createPlanService } from "../services/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices, flatPricesToJsonPricesHDI } from "../utils";
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

  const { prices, isMultiple, isHDI, ...rest } = data;

  console.log("data", JSON.parse(prices));

  const planData = {
    ...rest,
    prices: prices
      ? !isHDI
        ? flatPricesToJsonPrices(JSON.parse(prices))
        : flatPricesToJsonPricesHDI(JSON.parse(prices))
      : {},
  };

  console.log("planData", planData);

  await createPlanService(planData);

  redirect(`${prefix}/planes`);
};
