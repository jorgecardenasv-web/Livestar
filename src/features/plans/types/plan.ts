import { PlanType, Plan as PrismaPlan } from "@prisma/client";

export interface Plan extends PrismaPlan {
  deductibles: any
  prices: any
  planType: PlanType;
  company: {
    id: string;
    name: string;
    logo: string;
  };
}
