import { PaymentSelector } from "./payment-selector";
import { PlanSelector } from "./plan-selector";
import { insuranceCompanies } from "../data/insurance-data";
import { InsuranceCard } from "./insurance-card";
import { getInsuranceState } from "../actions/insurance-actions";

export async function InsurancePlans() {
  const { activePlanType, activePaymentType } = await getInsuranceState();

  const planTypes = ["Esencial", "Protegido", "Blindado"];
  const paymentTypes = ["Mensual", "Anual"];

  return (
    <div className="mx-auto px-4 py-2 space-y-4 mt-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelector planTypes={planTypes} activePlanType={activePlanType} />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      <div className="grid grid-flow-col md:auto-cols-max gap-2 items-end">
        {insuranceCompanies.map((company, index) => {
          const activePlan = company.plans.find(
            (plan: any) => plan.name === activePlanType,
          );
          return (
            activePlan && (
              <InsuranceCard
                key={`${company.name}-${activePlanType}`}
                company={company}
                plan={activePlan}
                paymentType={activePaymentType}
                isRecommended={index === 1}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
