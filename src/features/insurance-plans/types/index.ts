interface AdditionalClauses {
  internationalCoverage: boolean;
  maternityWaitingPeriod: number;
}

interface OpticalCoverage {
  examinations: boolean;
  lenses: number;
  frames: number;
}

interface Benefits {
  dentalCoverage: boolean;
  opticalCoverage: OpticalCoverage;
}

interface CustomizableOptions {
  deductibleOptions: number[];
  coInsuranceOptions: number[];
}

interface InsurancePlan {
  id: number;
  uuid: string;
  name: string;
  companyId: number;
  description: string;
  sumInsured: number;
  deductible: number;
  coInsurance: number;
  coInsuranceCap: number;
  hospitalTier: "BASIC" | string;
  medicalFeeSchedule: "BASIC" | string;
  additionalClauses: AdditionalClauses;
  benefits: Benefits;
  customizableOptions: CustomizableOptions;
  status: "ACTIVE" | string;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
}
