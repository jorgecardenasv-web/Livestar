import { PlanType, Plan as PrismaPlan } from "@generated/prisma/client";
import { CoInsuranceData, CoInsuranceCapData } from "../../quote/types";

export interface Plan extends Omit<PrismaPlan, "additionalInfoHtml"> {
  deductibles: any;
  prices: any;
  coInsurance: any | CoInsuranceData;
  coInsuranceCap: any | CoInsuranceCapData;
  planType: PlanType;
  additionalInfoHtml?: string | null;
  company: {
    id: string;
    name: string;
    logo: string;
  };
}
