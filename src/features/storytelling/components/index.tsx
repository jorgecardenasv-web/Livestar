import { InsurancePlans } from "@/features/insurance-plans/components/main/insurance-plans";
import { InsuranceFlow } from "./insurance-flow";
import { QuoteSummary } from "@/features/quote-summary/components/quote-summary";
import {
  getInsuranceState,
  getProspect,
} from "@/features/insurance-plans/actions/add-cookies";

export const InsuranceStorytelling = async ({ plans }: { plans: any[] }) => {
  const prospect = await getProspect();
  const { selectedPlan } = await getInsuranceState();

  const hasProspect = Object.keys(prospect).length > 0;
  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;

  return (
    <>
      {hasProspect && !hasSelectedPlan ? (
        <InsurancePlans insurancePlans={plans} />
      ) : hasSelectedPlan ? (
        <QuoteSummary {...selectedPlan} />
      ) : (
        <InsuranceFlow />
      )}
    </>
  );
};
