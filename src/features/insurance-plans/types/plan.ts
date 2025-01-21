import { Insurance, Plan as PlanPrisma, PlanType } from "@prisma/client";

export interface Plan extends Pick<PlanPrisma, "id" | "status" | "createdAt" | "planTypeId"> {
  company: Insurance
  planType: PlanType
}
