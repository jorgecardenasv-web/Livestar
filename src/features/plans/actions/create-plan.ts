"use server";

import { prefix } from "@/features/layout/nav-config/constants";
import { createPlanService } from "../services/create/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices, flatPricesToJsonPricesHDI } from "../utils";
import { createPlanSchema } from "../schema/create-plan.schema";
import { FormState } from "@/shared/types";
import { simplifyZodErrors } from "@/shared/utils";
import { updatePlanService } from "../services/update/update-plan.service";
import { PrismaError } from "@/shared/errors/prisma";
import { revalidatePath } from "next/cache";

export const createPlan = async (formData: FormData): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);
    const { data, success, error } = createPlanSchema.safeParse(rawFormData);

    if (!success) {
      return {
        success: false,
        message: "Error en la validación de los datos.",
        inputErrors: simplifyZodErrors(error),
      };
    }

    const { planTypeId, prices, isMultiple, planId, isUpdate, isHDI, ...rest } =
      data;

    const isRecommended = isHDI;

    const planData = {
      ...rest,
      prices: prices
        ? !isHDI
          ? flatPricesToJsonPrices(JSON.parse(prices))
          : flatPricesToJsonPricesHDI(JSON.parse(prices))
        : {},
      planTypeId: planTypeId,
      isRecommended: isRecommended,
    };

    await (isUpdate && planId
      ? updatePlanService(planData, planId)
      : createPlanService(planData));
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear el plan.",
    };
  }
  revalidatePath(`${prefix}/planes`);
  redirect(`${prefix}/planes`);
};
