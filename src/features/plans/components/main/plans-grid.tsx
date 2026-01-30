import { InsuranceCard } from "../cards/insurance-card";
import { getActivePlansByTypeLoader } from "../../loaders/get-plans-by-type";
import { getProspect } from "../../loaders/get-prospect";

interface PlansContentProps {
  currentPlanType: { id: string };
  activePaymentType: string;
}

export const PlansGrid = async ({
  currentPlanType,
  activePaymentType,
}: PlansContentProps) => {
  const plans = await getActivePlansByTypeLoader(currentPlanType.id);
  const prospectData = await getProspect();

  const sortedPlans = [...plans].sort(
    (a, b) => Number(b.isRecommended) - Number(a.isRecommended)
  );

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
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6">
        {sortedPlans.map((plan) => (
          <div key={plan.id} className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)] flex justify-center">
            <InsuranceCard
              company={plan.company}
              plan={plan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
              prospectData={prospectData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
