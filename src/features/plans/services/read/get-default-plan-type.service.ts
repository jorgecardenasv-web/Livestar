import prisma from "@/lib/prisma";
import { PlanStatus } from "@prisma/client";

export const getDefaultPlanType = async () => {
  const defaultPlanType = await prisma.planType.findFirst({
    where: {
      status: PlanStatus.ACTIVO,
      NOT: {
        name: "Hibrido",
      },
    },
    orderBy: {
      orderIndex: "asc",
    },
  });

  return defaultPlanType;
};
