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
  individualPricesJson?: string;
  imgCompanyLogo: string;
}

export interface QuotePDFData {
  company: string;
  plan: string;
  coverageFee: number;
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
  }[];
  isMultipleDeductible: boolean;
  deductibles?: Record<string, Record<string, number>>;
}
