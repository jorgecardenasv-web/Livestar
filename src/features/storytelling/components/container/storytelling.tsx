import { Plans } from "@/features/insurance-plans/components/main/insurance-plans";
import { InsuranceFlow } from "../main/insurance-flow-view";
import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { getProspect } from "@/features/insurance-plans/loaders/get-prospect";
import { getInsuranceState } from "@/features/insurance-plans/loaders/get-insurance-status";
import { getImage } from "@/shared/loaders/get-image";

export const InsuranceStorytelling = async ({ plans }: { plans: any[] }) => {
  const prospect = await getProspect();
  const { selectedPlan } = await getInsuranceState();
  const companyLogo = selectedPlan.companyLogo
    ? await getImage(selectedPlan.companyLogo)
    : "";

  const selectedPlanData = {
    imgCompanyLogo: companyLogo,
    ...selectedPlan,
  };

  const hasProspect = Object.keys(prospect).length > 0;
  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;

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
