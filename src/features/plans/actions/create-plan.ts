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
    console.log("Datos recibidos en el formulario:", rawFormData);

    const { data, success, error } = createPlanSchema.safeParse(rawFormData);

    if (!success) {
      console.error("Error de validación:", error.format());
      console.error(
        "Campos con error:",
        JSON.stringify(error.format(), null, 2)
      );
      return {
        success: false,
        message: "Error en la validación de los datos.",
        inputErrors: simplifyZodErrors(error),
      };
    }

    console.log("Validación exitosa, datos procesados:", data);

    const {
      planTypeId,
      prices,
      isMultiple,
      planId,
      isUpdate,
      isHDI,
      isRecommended,
      isMultipleCoInsurance, // Extraemos este campo explícitamente para no enviarlo a Prisma
      ...rest
    } = data;

    // Obtener la información adicional HTML directamente del formulario
    const additionalInfoHtml =
      formData.get("additionalInfoHtml")?.toString() || null;

    console.log("Valor de additionalInfoHtml:", additionalInfoHtml);
    console.log(
      "Longitud de additionalInfoHtml:",
      additionalInfoHtml?.length || 0
    );
    console.log(
      "Primeros 100 caracteres:",
      additionalInfoHtml?.substring(0, 100)
    );
    console.log(
      "Campo isMultipleCoInsurance (será ignorado):",
      isMultipleCoInsurance
    );

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

    console.log("Datos a enviar al servicio:", planData);
    console.log("Es actualización:", isUpdate, "ID del plan:", planId);

    try {
      const serviceResult = await (isUpdate && planId
        ? updatePlanService(planData, planId)
        : createPlanService(planData));
      console.log("Operación completada con éxito:", serviceResult);

      // Redirigir solo si la operación fue exitosa
      // Invalidamos explícitamente el cache del plan para asegurarnos de que los cambios se reflejen
      revalidatePath(`${prefix}/planes`, "page");
      revalidatePath("/", "layout");

      // También invalidamos cualquier cache individual del plan
      if (isUpdate && planId) {
        revalidatePath(`${prefix}/planes/editar/${planId}`, "page");
      }

      redirect(`${prefix}/planes`);

      // Esto no se ejecutará debido al redirect, pero TypeScript lo necesita
      return {
        success: true,
        message: isUpdate
          ? "Plan actualizado exitosamente"
          : "Plan creado exitosamente",
      };
    } catch (err) {
      console.error("Error detallado al llamar al servicio:", err);

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
    console.error("Error general en createPlan:", error);
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
