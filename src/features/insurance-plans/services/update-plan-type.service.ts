import prisma from "@/lib/prisma";

export const updatePlanTypeService = (planTypeId: string, formData: any) => {
  return prisma.planType.update({
    where: {
      id: planTypeId,
    },
    data: formData,
  });
};
