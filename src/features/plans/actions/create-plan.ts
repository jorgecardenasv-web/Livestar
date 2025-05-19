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

    const {
      planTypeId,
      prices,
      isMultiple,
      planId,
      isUpdate,
      isHDI,
      isRecommended,
      isMultipleCoInsurance,
      ...rest
    } = data;

    // Obtener la información adicional HTML directamente del formulario
    const additionalInfoHtml =
      formData.get("additionalInfoHtml")?.toString() || null;

    // Eliminamos cualquier campo adicional que no esté en el modelo de Prisma
    const planData = {
      ...rest,
      prices: prices
        ? !isHDI
          ? flatPricesToJsonPrices(JSON.parse(prices))
          : flatPricesToJsonPricesHDI(JSON.parse(prices))
        : {},
      planTypeId,
      isRecommended,
      additionalInfoHtml,
    };

    try {
      await (isUpdate && planId
        ? updatePlanService(planData, planId)
        : createPlanService(planData));

      // Redirigir solo si la operación fue exitosa
      revalidatePath(`${prefix}/planes`);

      // Retornar un mensaje para evitar el redirect automático cuando estamos actualizando
      if (isUpdate) {
        return {
          success: true,
          message: "Plan actualizado exitosamente",
        };
      }

      // Solo redirigir en caso de creación
      redirect(`${prefix}/planes`);
    } catch (err) {
      // Devolver un mensaje amigable para el usuario
      return {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Error al procesar la solicitud. Por favor, intenta de nuevo.",
      };
    }
  } catch (error) {
    console.log("Error al crear el tipo de plan:", error);
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Error al crear el plan.",
    };
  }
};
