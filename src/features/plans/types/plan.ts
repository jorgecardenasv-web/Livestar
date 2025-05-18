import { PlanType, Plan as PrismaPlan } from "@prisma/client";
import { CoInsuranceData, CoInsuranceCapData } from "../../quote/types";

export interface Plan extends PrismaPlan {
  deductibles: any;
  prices: any;
  coInsurance: any | CoInsuranceData;
  coInsuranceCap: any | CoInsuranceCapData;
  planType: PlanType;
  company: {
    id: string;
    name: string;
    logo: string;
  };
}
