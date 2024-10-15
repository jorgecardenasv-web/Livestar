import { PaymentSelector } from "./payment-selector";
import { PlanSelector } from "./plan-selector";
import { InsuranceCard } from "./insurance-card";
import { getInsuranceState } from "../actions/insurance-actions";
import { InsurancePlan } from "@/shared/types/insurance";

export async function InsurancePlans({
  insurancePlans,
}: {
  insurancePlans: InsurancePlan[];
}) {
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
        {insurancePlans.map((plan, index) => {
          const activePlan = plan.name === activePlanType ? plan : null;

          return (
            activePlan && (
              <InsuranceCard
                key={`${plan.company.name}-${activePlanType}`}
                company={plan.company}
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
