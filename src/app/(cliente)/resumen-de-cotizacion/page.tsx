import { QuoteSummary } from "@/features/quote-summary/components/quote-summary";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getInsuranceState } from "@/features/insurance-plans/actions/insurance-actions";
import { notFound } from "next/navigation";

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
}

export default async function QuoteSummaryPage() {
  const { selectedPlan } = await getInsuranceState();

  if (!selectedPlan || Object.keys(selectedPlan).length === 0) {
    notFound();
  }

  return (
    <>
      <HeaderSecondary />
      <div className="py-14 px-5">
        <QuoteSummary {...selectedPlan} />
      </div>
    </>
  );
}
