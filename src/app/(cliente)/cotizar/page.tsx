import { redirect } from 'next/navigation';
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";

export default async function QuotePage() {
  const { prospect } = await getProspect();
  const { selectedPlan } = await getInsuranceState();

  const hasProspect = Object.keys(prospect).length > 0;
  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;

  if (hasProspect && !hasSelectedPlan) {
    redirect('/cotizar/planes');
  } else if (hasSelectedPlan && hasProspect) {
    redirect('/cotizar/resumen');
  } else {
    redirect('/cotizar/flow');
  }
}
