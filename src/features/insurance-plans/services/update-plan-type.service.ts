import prisma from "@/lib/prisma";

export const editPlanTypeService = (planTypeId: string, formData: any) => {

  console.log(planTypeId, formData);
  
  return prisma.planType.update({
    where: {
      id: planTypeId,
    },
    data: formData,
  });
};
