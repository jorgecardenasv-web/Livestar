import {
  Deductible,
  Insurance as InsurancePrisma,
  Plan as PlanPrisma,
  PlanType,
} from "@prisma/client";

export interface Insurance
  extends Omit<InsurancePrisma, "id" | "uuid"> {
  id: string;
}

export interface Plan
  extends Omit<PlanPrisma, "id" | "uuid"> {
  id: string;
  company: Insurance;
  planType: PlanType;
  deductibles: Deductible
}
