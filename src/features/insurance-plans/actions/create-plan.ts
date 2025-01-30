"use server";

import { prefix } from "@/shared/utils/constants";
import { createPlanService } from "../services/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices, flatPricesToJsonPricesHDI } from "../utils";
import { createPlanSchema } from "../schema/create-plan.schema";
import { FormState } from "@/shared/types";
import { simplifyZodErrors } from "@/shared/utils";
import { updatePlanService } from "../services/update-plan.service";

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

  const { planTypeId, prices, isMultiple, planId, isUpdate, isHDI, ...rest } = data;

  const isRecommended =
    planTypeId === "0276029a-fd32-4af3-b513-97c50b1adb94" ? true : false;

  const planData = {
    ...rest,
    prices: prices
      ? (!isHDI
          ? flatPricesToJsonPrices(JSON.parse(prices))
          : flatPricesToJsonPricesHDI(JSON.parse(prices)))
      : {},
    planTypeId: planTypeId,
    isRecommended: isRecommended,
  };

  await (isUpdate
    ? updatePlanService(planData, planId)
    : createPlanService(planData));
  redirect(`${prefix}/planes`);
};
