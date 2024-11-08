import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { InsuranceFlow } from "@/components/insurance-flow";

export interface InsuranceQuoteData {
  company: string;
  companyLogo: string;
  plan: string;
  paymentType: string;
  sumInsured: string;
  deductible: string;
  coInsurance: string;
  coInsuranceCap: string;
  coverage_fee: string;
  id: string;
}

export default function QuoteSummaryPage() {
  return (
    <>
      <HeaderSecondary />
      <InsuranceFlow />
    </>
  );
}
