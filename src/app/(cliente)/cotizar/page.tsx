import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { ModalStorytellingActions } from "@/features/storytelling/components/modal-storytelling-actions";
import { InsuranceStorytelling } from "@/features/storytelling/components";
import { getInsurancePlans } from "@/features/insurance-plans/loaders/get-insurance-companies";

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

export default async function QuoteSummaryPage() {
  const plans = await getInsurancePlans();

  return (
    <>
      <HeaderSecondary />
      <InsuranceStorytelling plans={plans} />
      <ModalStorytellingActions />
    </>
  );
}
