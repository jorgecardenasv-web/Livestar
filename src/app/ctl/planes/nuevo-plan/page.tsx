import InsurancePlanForm from "@/features/insurance-plans/components/form/insurance-plan-form";
import { HeaderPlan } from "@/features/insurance-plans/components/header/header-plan";
import { ModalPlanActions } from "@/features/insurance-plans/components/ui/modal-plan-actions";
import { getInsuranceCompany } from "@/features/insurance-plans/loaders/get-insurance-companies";

export default async function NewPlan () {
  const insuranceCompanies = await getInsuranceCompany()
  
  return (
    <>
      <HeaderPlan />
      <InsurancePlanForm insuranceCompanies={insuranceCompanies} />
      <ModalPlanActions />
    </>
  )
}