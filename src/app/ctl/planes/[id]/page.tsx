import InsurancePlanForm from "@/features/insurance-plans/components/form/insurance-plan-form";
import { getInsuranceCompany } from "@/features/insurance-plans/loaders/get-insurance-companies";
import { getInsurancePlanById } from "@/features/insurance-plans/loaders/get-insurance-plan-by-id";

export default async function NewPlan({
  params: { id },
}: {
  params: { id: string };
}) {
  const insuranceCompanies = await getInsuranceCompany();
  const insurancePlan = await getInsurancePlanById(id);

  return (
    <div className="w-full">
      <InsurancePlanForm
        insurancePlan={insurancePlan}
        insuranceCompanies={insuranceCompanies}
      />
    </div>
  );
}
