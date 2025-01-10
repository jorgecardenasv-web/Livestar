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



export interface InsurancePriceResult {
  coverage_fee: number;
  individualPrices: {
    main: number;
    partner?: number;
    children?: number[];
  };
}

export interface PriceAmount {
  anual: number;
  mensual: number;
}

export interface GenderPrices {
  mujer: PriceAmount;
  hombre: PriceAmount;
}

export interface PriceTable {
  [age: string]: GenderPrices;
}

export interface Child {
  age: number;
  gender: 'mujer' | 'hombre';
}

export interface FamiliaAdditionalInfo {
  children: Child[];
  partnerAge: number;
  childrenCount: number;
  partnerGender: 'mujer' | 'hombre';
}

export interface InsuranceData {
  id: string;
  postalCode: string;
  age: number;
  gender?: 'mujer' | 'hombre';
  additionalInfo: FamiliaAdditionalInfo;
  protectWho: 'familia'; 
}