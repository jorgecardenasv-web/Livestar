import { Plan } from "../../types/plan";
import { InsuranceCard } from "../cards/insurance-card";
import { getActivePlansByTypeLoader } from "../../loaders/get-plans-by-type";

interface PlansContentProps {
  currentPlanType: { id: string };
  activePaymentType: string;
}

export const PlansContent = async ({
  currentPlanType,
  activePaymentType,
}: PlansContentProps) => {
  const plans = await getActivePlansByTypeLoader(currentPlanType.id);

  if (plans.length === 0) {
    return (
      <div className="text-center py-8">
        <p>
          No hay planes disponibles para esta selección. Prueba cambiar el tipo de
          plan o la forma de pago.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center mx-auto max-w-[1200px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center justify-items-center">
        {plans.map((plan) => (
          <div key={plan.id} className="w-full max-w-md">
            <InsuranceCard
              company={plan.company}
              plan={plan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
