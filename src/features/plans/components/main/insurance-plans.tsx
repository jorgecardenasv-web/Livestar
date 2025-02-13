import { getInsuranceState } from "../../loaders/get-insurance-status";
import { InsuranceCard } from "../cards/insurance-card";
import { PaymentSelector } from "../selectors/payment-selector";
import { PlanSelector } from "../selectors/plan-selector";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { deleteProspectQuote } from "../../actions/set-cookies";

export const Plans = async ({ plans }: { plans: any[] }) => {
  const { activePlanType, activePaymentType } = await getInsuranceState();
  // TODO-SOSA: Consulta a tabla planType y excluir el hibrido ( es especial )
  const planTypes = ["Plan Básico", "Plan Intermedio", "Plan Plus"];
  const paymentTypes = ["Mensual", "Anual"];

  const hibridPlans = plans.filter(
    (plan) => !planTypes.includes(plan.planType.name)
  );

  return (
    <div className="mx-auto px-4 py-2 space-y-4 m-8">
      <div className="flex justify-center">
        <form action={deleteProspectQuote}>
        <SubmitButton
            type="submit"
            label="Empezar de Nuevo"
            labelPending="Cargando..."
            className="w-full bg-white border border-blue-600 text-[#223E99] py-3 rounded font-bold text-lg transition duration-300"
            />
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <PlanSelector planTypes={planTypes} activePlanType={activePlanType} />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
        {plans.map((plan, index) => {
          const activePlan =
            plan.planType.name === activePlanType ? plan : null;

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
        {hibridPlans.map((plan, index) => {
          return (
            <InsuranceCard
              key={`${plan.company.name}-${activePlanType}`}
              company={plan.company}
              plan={plan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
            />
          );
        })}
      </div>
    </div>
  );
};
