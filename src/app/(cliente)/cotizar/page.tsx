import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { InsuranceStorytelling } from "@/features/storytelling/components/container/storytelling";

export interface InsuranceQuoteData {
  company: string;
  imgCompanyLogo: string;
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
}

export default async function QuoteSummaryPage() {
  return (
    <div>
      <HeaderSecondary />
      <InsuranceStorytelling />
      <ModalStorytellingActions />
    </div>
  );
}
