import { InsurancePlanForm } from "@/features/plans/components/forms/plan/plan-form";
import { getInsuranceCompany } from "@/features/plans/loaders/get-insurance-companies";
import { getInsurancePlanById } from "@/features/plans/loaders/get-insurance-plan-by-id";
import { getPlanTypes } from "@/features/plans/loaders/get-plan-types";

export default async function NewPlan({
  params: { id },
}: {
  params: { id: string };
}) {
  const insuranceCompanies = await getInsuranceCompany();
  const { data: {
    items
  } } = await getPlanTypes({
    page: "1",
    offset: "100",
  })
  const insurancePlan = await getInsurancePlanById(id);

  return (
    <div className="w-full">
      <InsurancePlanForm
        plan={insurancePlan}
        planTypes={items}
        insurances={insuranceCompanies}
      />
    </div>
  );
}
