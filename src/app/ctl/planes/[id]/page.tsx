import { InsurancePlanForm } from "@/features/insurance-plans/components/forms/insurance-plan-form";
import { getInsuranceCompany } from "@/features/insurance-plans/loaders/get-insurance-companies";
import { getInsurancePlanById } from "@/features/insurance-plans/loaders/get-insurance-plan-by-id";
import { getPlanTypes } from "@/features/insurance-plans/loaders/get-plan-types";

export default async function NewPlan({
  params: { id },
}: {
  params: { id: string };
}) {
  const insuranceCompanies = await getInsuranceCompany();
  const planTypes = await getPlanTypes()
  const insurancePlan = await getInsurancePlanById(id);

  return (
    <div className="w-full">
      <InsurancePlanForm
        plan={insurancePlan}
        planTypes={planTypes}
        insurances={insuranceCompanies}
      />
    </div>
  );
}
