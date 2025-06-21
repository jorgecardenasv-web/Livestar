import { Plan } from "../../types/plan";
import { InsuranceCard } from "../cards/insurance-card";
import { getActivePlansByTypeLoader } from "../../loaders/get-plans-by-type";

interface PlansContentProps {
  currentPlanType: { id: string };
  activePaymentType: string;
}

export const PlansGrid = async ({
  currentPlanType,
  activePaymentType,
}: PlansContentProps) => {
  const plans = await getActivePlansByTypeLoader(currentPlanType.id);

  if (plans.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No hay planes disponibles para esta selección.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6">
        {plans.map((plan) => (
          <div key={plan.id} className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)] flex justify-center">
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
