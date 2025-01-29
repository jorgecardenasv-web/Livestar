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
  gender: "mujer" | "hombre";
}

export interface FamiliaAdditionalInfo {
  children: Child[];
  partnerAge: number;
  childrenCount: number;
  partnerGender: "mujer" | "hombre";
}

export interface InsuranceData {
  id: string;
  postalCode: string;
  age: number;
  gender?: "mujer" | "hombre";
  additionalInfo: FamiliaAdditionalInfo;
  protectWho: "familia";
}

export interface PriceDataHDI {
  age: number;
  monthlyPrice1: number;
  monthlyPrice2to12: number;
  annualPrice: number;
}
