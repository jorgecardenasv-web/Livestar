import { Plans } from "@/features/plans/components/main/insurance-plans";
import { InsuranceFlow } from "../main/insurance-flow-view";
import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { getImage } from "@/shared/services/get-image.service";
import { getInsurancePlanById } from "@/features/plans/loaders/get-insurance-plan-by-id";

export const InsuranceStorytelling = async ({ plans }: { plans: any[] }) => {
  const { prospect } = await getProspect();
  const { selectedPlan } = await getInsuranceState();

  let selectedPlanData

  const hasProspect = Object.keys(prospect).length > 0;

  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;

  if (hasSelectedPlan) {
    const plan = await getInsurancePlanById(selectedPlan.id);
    selectedPlanData = {
      ...selectedPlan,
      imgCompanyLogo: plan.company.logo,
    };
  }

  return (
    <>
      {hasProspect && !hasSelectedPlan ? (
        <Plans plans={plans} />
      ) : hasSelectedPlan ? (
        <QuoteSummary {...selectedPlanData} />
      ) : (
        <InsuranceFlow />
      )}
    </>
  );
};
