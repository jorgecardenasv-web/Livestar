import { getPlans } from "../../loaders/get-plans";
import { Plan } from "../../types/plan";
import { InsuranceCard } from "../cards/insurance-card";

interface PlansGridProps {
  regularPlans: Plan[];
  hybridPlans: Plan[];
  currentPlanType: { id: string };
  activePaymentType: string;
}

const PlansGrid = ({
  regularPlans,
  hybridPlans,
  currentPlanType,
  activePaymentType,
}: PlansGridProps) => {
  return (
    <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
      {regularPlans.map((plan) => {
        const activePlan =
          plan.planTypeId === currentPlanType?.id ? plan : null;

        return (
          activePlan && (
            <InsuranceCard
              key={activePlan.id}
              company={plan.company}
              plan={activePlan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
            />
          )
        );
      })}
      {hybridPlans.map((plan) => {
        const activePlan =
          plan.planTypeId === currentPlanType?.id ? plan : null;

        return (
          activePlan && (
            <InsuranceCard
              key={activePlan.id}
              company={plan.company}
              plan={activePlan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
            />
          )
        );
      })}
    </div>
  );
};

interface PlansContentProps {
  planTypeId: string;
  regularPlanTypes: { id: string }[];
  currentPlanType: { id: string };
  activePaymentType: string;
}

export const PlansContent = async ({
  planTypeId,
  regularPlanTypes,
  currentPlanType,
  activePaymentType,
}: PlansContentProps) => {
  const {
    data: { items: plans },
  } = await getPlans({
    page: "1",
    offset: "100",
  });

  const sortedPlans = (plans as Plan[]).sort(
    (a, b) => a.planType.orderIndex - b.planType.orderIndex
  );

  const regularPlans = sortedPlans.filter(
    (plan) => !["hibrido", "híbrido"].includes(plan.planType.name.toLowerCase())
  );

  const hybridPlans = sortedPlans.filter((plan) =>
    ["hibrido", "híbrido"].includes(plan.planType.name.toLowerCase())
  );

  if (regularPlans.length === 0 && hybridPlans.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No hay planes disponibles para esta selección.</p>
      </div>
    );
  }

  return (
    <PlansGrid
      regularPlans={regularPlans}
      hybridPlans={hybridPlans}
      currentPlanType={currentPlanType}
      activePaymentType={activePaymentType}
    />
  );
};
