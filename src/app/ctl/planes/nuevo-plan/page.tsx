import InsurancePlanForm from "@/features/insurance-plans/components/form/insurance-plan-form";
import { getInsuranceCompany } from "@/features/insurance-plans/loaders/get-insurance-companies";

export default async function NewPlan () {
  const insuranceCompanies = await getInsuranceCompany()
  
  return (
    <div className="w-full">
      <InsurancePlanForm insuranceCompanies={insuranceCompanies} />
    </div>
  )
}