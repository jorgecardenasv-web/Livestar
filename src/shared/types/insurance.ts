import { StaticImageData } from "next/image";

export type CompanyStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING_REVIEW"
  | "BLACKLISTED";
export type PlanStatus = "ACTIVE" | "INACTIVE" | "DRAFT" | "DISCONTINUED";
export type HospitalTier = "BASIC" | "INTERMEDIATE" | "EXECUTIVE" | "PLUS";
export type MedicalFeeSchedule =
  | "BASIC"
  | "INTERMEDIATE"
  | "HIGH"
  | "EXECUTIVE";

export interface InsuranceCompany {
  id: number;
  uuid: string;
  name: string;
  logo: StaticImageData;
  description?: string;
  status: CompanyStatus;
  createdAt: Date;
  updatedAt: Date;
  plans: InsurancePlan[];
}

export interface InsurancePlan {
  id: number;
  uuid: string;
  totalPrice: number;
  name: string;
  companyId: number;
  description?: string;
  sumInsured: number;
  deductible: number;
  coInsurance: number;
  coInsuranceCap?: number;
  hospitalTier: HospitalTier;
  medicalFeeSchedule: MedicalFeeSchedule;
  additionalClauses: any;
  benefits: any;
  customizableOptions: any;
  status: PlanStatus;
  createdAt: Date;
  updatedAt: Date;
}
