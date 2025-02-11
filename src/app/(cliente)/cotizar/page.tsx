import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { InsuranceStorytelling } from "@/features/storytelling/components/container/storytelling";
import { getPlans } from "@/features/plans/loaders/get-plans";

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
  isMultipleString?: string;
  deductiblesJson?: string;
  individualPricesJson?: string;
}

export default async function QuoteSummaryPage() {
  const { data: { items } } = await getPlans({
    page: "1",
    offset: "100",
  });

  return (
    <>
      <HeaderSecondary />
      <InsuranceStorytelling plans={items} />
      <ModalStorytellingActions />
    </>
  );
}
