import { Insurance as InsurancePrisma } from "@prisma/client";
import { Insurance } from "../types/insurance";

export const insuranceTransformer = (insurance: InsurancePrisma): Insurance => {
  return {
    id: insurance.id,
    logo: insurance.logo,
    name: insurance.name,
    createdAt: insurance.createdAt,
    status: insurance.status,
  };
};
