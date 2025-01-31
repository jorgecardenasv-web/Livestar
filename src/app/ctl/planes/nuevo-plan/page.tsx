import { InsurancePlanForm } from "@/features/plans/components/forms/plan/plan-form";
import { getInsuranceCompany } from "@/features/plans/loaders/get-insurance-companies";
import { getPlanTypes } from "@/features/plans/loaders/get-plan-types";

export default async function NuevoPlan() {
  const insurances = await getInsuranceCompany();
  const planTypes = await getPlanTypes();

  return (
    <>
      <InsurancePlanForm insurances={insurances} planTypes={planTypes} />
    </>
  );
}
