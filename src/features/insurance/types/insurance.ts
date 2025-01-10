import { InsuranceCompany } from "@prisma/client";

export interface Insurance
  extends Pick<InsuranceCompany, "logo" | "name" | "createdAt" | "status"> {
  id: string;
}
