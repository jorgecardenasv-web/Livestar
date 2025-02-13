import { getPlans } from "../../loaders/get-plans";
import { Plan } from "../../types/plan";
import { InsuranceCard } from "../cards/insurance-card";
import { InsuranceCardSkeleton } from "../skeletons/insurance-card-skeleton";
import { Suspense } from "react";

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
  activePaymentType
}: PlansGridProps) => {
  return (
    <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
      {regularPlans.map((plan) => {
        const activePlan =
          plan.planTypeId === currentPlanType.id ? plan : null;

        return (
          activePlan && (
            <InsuranceCard
              key={`${plan.company.name}-${currentPlanType.id}`}
              company={plan.company}
              plan={activePlan}
              paymentType={activePaymentType}
              isRecommended={plan.isRecommended}
            />
          )
        );
      })}
      {hybridPlans.map((plan) => (
        <InsuranceCard
          key={`${plan.company.name}-hybrid`}
          company={plan.company}
          plan={plan}
          paymentType={activePaymentType}
          isRecommended={plan.isRecommended}
        />
      ))}
    </div>
  );
};

interface PlansContentProps {
  planTypeId: string;
  regularPlanTypes: { id: string }[]; // Tipado más específico
  currentPlanType: { id: string };
  activePaymentType: string;
}

export const PlansContent = async ({
  planTypeId,
  regularPlanTypes,
  currentPlanType,
  activePaymentType
}: PlansContentProps) => {
  // Mover la obtención de datos aquí para que sea async
  const { data: { items: plans } } = await getPlans({
    page: "1",
    offset: "100",
    planTypeId,
  });

  const regularPlans = (plans as Plan[])
    .filter(plan => regularPlanTypes.map(pt => pt.id).includes(plan.planTypeId))
    .sort((a, b) => a.planType.orderIndex - b.planType.orderIndex);

  const hybridPlans = (plans as Plan[]).filter(plan =>
    ['hibrido', 'híbrido'].includes(plan.planType.name.toLowerCase())
  );

  return (
    <Suspense fallback={
      <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
        {[1, 2, 3].map((i) => (
          <InsuranceCardSkeleton key={i} />
        ))}
      </div>
    }>
      <PlansGrid
        regularPlans={regularPlans}
        hybridPlans={hybridPlans}
        currentPlanType={currentPlanType}
        activePaymentType={activePaymentType}
      />
    </Suspense>
  );
};
