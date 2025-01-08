import InsurancePlanForm from "@/features/insurance-plans/components/form/insurance-plan-form";
import { getInsurancePlanById } from "@/features/insurance-plans/loaders/get-insurance-plan-by-id";

export default async function NewPlan ({
  params: { id },
}: {
  params: { id: string };
}) {
  const insuranceCompanies = await getInsurancePlanById(id)

  console.log(insuranceCompanies)
  
  
  return (
    <div className="w-full">
      {/* <InsurancePlanForm insuranceCompanies={insuranceCompanies} /> */}
    </div>
  )
}