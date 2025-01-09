import { InsuranceCard } from "../card/insurance-card";
import { PlanSelector } from "../selector/plan-selector";
import { PaymentSelector } from "../selector/payment-selector";
import { getInsuranceState } from "../../loaders/get-insurance-status";
import { getProspect } from "../../loaders/get-prospect";

export const InsurancePlans = async ({
  insurancePlans,
}: {
  insurancePlans: any[];
}) => {
  const { activePlanType, activePaymentType } = await getInsuranceState();
  const prospect = await getProspect();

  console.log(prospect);
  

  const planTypes = ["Plan Básico", "Plan Intermedio", "Plan Plus"];
  const paymentTypes = ["Mensual", "Anual"];

  return (
    <div className="mx-auto px-4 py-2 space-y-4 m-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelector planTypes={planTypes} activePlanType={activePlanType} />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      <div className="grid grid-flow-col justify-center md:auto-cols-max gap-2 items-end">
        {insurancePlans.map((plan) => {
          const activePlan = plan.name === activePlanType ? plan : null;
          return (
            activePlan && (
              <InsuranceCard
                key={`${plan.company.name}-${activePlanType}`}
                company={plan.company}
                plan={activePlan}
                paymentType={activePaymentType}
                isRecommended={plan.isRecommended}
              />
            )
          );
        })}
      </div>
    </div>
  );
};
