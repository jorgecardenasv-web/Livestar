export interface InsuranceQuoteData {
  company: string;
  plan: string;
  paymentType: string;
  sumInsured: number;
  deductible: number;
  coInsurance: number;
  coInsuranceCap: number;
  coverage_fee: number;
  id: string;
  protectedWho: string;
  isMultipleString?: string;
  deductiblesJson?: string;
  isMultipleCoInsurance?: string;
  coInsuranceJson?: string;
  coInsuranceCapJson?: string;
  individualPricesJson?: string;
  imgCompanyLogo: string;
  postalCode?: string;
  contractorName?: string;
  prospect: any; //
}

export interface QuotePDFData {
  company: string;
  plan: string;
  paymentType: string;
  sumInsured: number;
  deductible: number;
  coInsurance: number;
  coInsuranceCap: number;
  members: {
    type: string;
    price: number;
    name?: string;
    relationship?: string;
    age?: number;
    anual?: number;
    primerMes?: number;
    segundoMesADoce?: number;
  }[];
  isMultipleDeductible: boolean;
  deductibles?: Record<string, Record<string, number>>;
  isMultipleCoInsurance?: boolean;
  coInsuranceData?: Record<string, Record<string, number>>;
  coInsuranceCapData?: Record<string, Record<string, number>>;
  postalCode?: string;
  contractorName?: string;
  hasDetailedPricing?: boolean;
  totalAnual?: number;
  totalPrimerMes?: number;
  totalSegundoMesADoce?: number;
  totalMensual?: number;
  individualPricesJson?: string;
}
