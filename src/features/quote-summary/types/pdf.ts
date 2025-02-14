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
  insuranceLogo: string;
}
