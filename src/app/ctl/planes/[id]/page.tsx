import { InsurancePlanForm } from "@/features/plans/components/forms/plan/plan-form";
import { getInsuranceCompany } from "@/features/plans/loaders/get-insurance-companies";
import { getInsurancePlanById } from "@/features/plans/loaders/get-insurance-plan-by-id";
import { getPlanTypes } from "@/features/plans/loaders/get-plan-types";

export default async function EditPlan({
  params: { id },
}: {
  params: { id: string };
}) {
  // Realizar las solicitudes en paralelo para mejorar el rendimiento
  const [insuranceCompanies, planTypesResult, insurancePlan] = await Promise.all([
    getInsuranceCompany(),
    getPlanTypes({
      page: "1",
      offset: "100",
    }),
    getInsurancePlanById(id),
  ]);

  const { data: { items } } = planTypesResult;

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
