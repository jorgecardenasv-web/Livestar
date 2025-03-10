import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { getInsurancePlanById } from "@/features/plans/loaders/get-insurance-plan-by-id";
import { ScrollToTop } from "@/shared/components/scroll-to-top";

export default async function ResumenPage() {
  const { selectedPlan } = await getInsuranceState();
  const plan = await getInsurancePlanById(selectedPlan.id);
  const selectedPlanData = {
    ...selectedPlan,
    imgCompanyLogo: plan.company.logo,
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      <QuoteSummary {...selectedPlanData} />
      <ModalStorytellingActions />
    </main>
  );
}
