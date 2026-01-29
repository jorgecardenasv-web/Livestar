import prisma from "@/lib/prisma";
import { Plan } from "../../types/plan";
import { unstable_cache } from "next/cache";
import { PlanStatus } from "@generated/prisma/client";

export const getActivePlansByType = async (planTypeId: string) => {
  return unstable_cache(
    async () => {
      const plans = await prisma.plan.findMany({
        where: {
          planTypeId,
          status: PlanStatus.ACTIVO,
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          planType: {
            select: {
              id: true,
              name: true,
              orderIndex: true,
            },
          },
        },
        orderBy: [{ isRecommended: "desc" }],
      });

      return plans as Plan[];
    },
    [`active-plans-by-type-${planTypeId}`],
    {
      revalidate: 60,
      tags: ["plans", `plans-${planTypeId}`],
    }
  )();
};
