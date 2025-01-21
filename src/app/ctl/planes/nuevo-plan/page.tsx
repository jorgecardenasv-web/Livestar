import { InsurancePlanForm } from "@/features/insurance-plans/components/forms/insurance-plan-form";
import { getInsuranceCompany } from "@/features/insurance-plans/loaders/get-insurance-companies";
import { getPlanTypes } from "@/features/insurance-plans/loaders/get-plan-types";

export default async function NuevoPlan() {
  const insurances = await getInsuranceCompany();
  const planTypes = await getPlanTypes();

  return (
    <>
      <InsurancePlanForm insurances={insurances} planTypes={planTypes} />
    </>
  );
}
