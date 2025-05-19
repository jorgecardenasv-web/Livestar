import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

export const updatePlanService = async (
  data: Prisma.PlanUncheckedCreateInput,
  planId: string
) => {
  try {
    // Primero verificamos que el plan exista
    const existingPlan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!existingPlan) {
      throw new Error(`El plan con ID ${planId} no existe`);
    }

    // Extraemos los campos que necesitamos para la actualización
    const { companyId, planTypeId, ...updateDataWithExtra } = data;
    // Extraemos campos adicionales que no forman parte del modelo de Prisma
    // @ts-ignore - Ignoramos el error de tipo para este campo adicional
    const { isMultipleCoInsurance, ...updateDataRaw } = updateDataWithExtra;

    // Verifica que los IDs sean correctos
    const company = await prisma.insurance.findUnique({
      where: { id: companyId as string },
    });

    if (!company) {
      throw new Error(`La compañía con ID ${companyId} no existe`);
    }

    const planType = await prisma.planType.findUnique({
      where: { id: planTypeId as string },
    });

    if (!planType) {
      throw new Error(`El tipo de plan con ID ${planTypeId} no existe`);
    }

    // Asegurarnos de que los datos JSON sean objetos válidos y eliminar campos que no existen en el modelo
    const sanitizedData = {
      ...updateDataRaw,
      // Asegurarse de que los campos JSON sean objetos válidos
      prices:
        typeof updateDataRaw.prices === "string"
          ? JSON.parse(updateDataRaw.prices)
          : updateDataRaw.prices,
      deductibles:
        typeof updateDataRaw.deductibles === "string"
          ? JSON.parse(updateDataRaw.deductibles)
          : updateDataRaw.deductibles,
      coInsurance:
        typeof updateDataRaw.coInsurance === "string"
          ? JSON.parse(updateDataRaw.coInsurance)
          : updateDataRaw.coInsurance,
      coInsuranceCap: updateDataRaw.coInsuranceCap
        ? typeof updateDataRaw.coInsuranceCap === "string"
          ? JSON.parse(updateDataRaw.coInsuranceCap)
          : updateDataRaw.coInsuranceCap
        : {},
      // Asegurarse de que additionalInfoHtml sea un string o null
      additionalInfoHtml: updateDataRaw.additionalInfoHtml || null,
    };

    const updatedPlan = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        ...sanitizedData,
        company: {
          connect: {
            id: companyId as string,
          },
        },
        planType: {
          connect: {
            id: planTypeId as string,
          },
        },
      },
    });

    return {
      success: true,
      message: "Plan actualizado exitosamente",
      updatedPlan,
    };
  } catch (error) {
    console.error("Error detallado al actualizar plan:", error);

    // Si es un error personalizado que ya hemos lanzado, lo pasamos directamente
    if (
      error instanceof Error &&
      !(error instanceof Prisma.PrismaClientKnownRequestError)
    ) {
      throw error;
    }

    // Si es un error de Prisma, obtenemos más detalles
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Código de error Prisma:", error.code);
      console.error("Mensaje de error Prisma:", error.message);
      if (error.meta) {
        console.error("Metadatos del error:", error.meta);
      }
    }

    throw handlePrismaError(error);
  }
};
