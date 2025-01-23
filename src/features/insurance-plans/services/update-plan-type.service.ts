import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const updatePlanTypeService = (
  planTypeId: string,
  formData: Prisma.PlanTypeUpdateInput
) => {
  return prisma.planType.update({
    where: {
      id: planTypeId,
    },
    data: formData,
  });
};
