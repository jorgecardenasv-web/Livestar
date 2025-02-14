import { getInsuranceState } from "../../loaders/get-insurance-status";
import { getCachedPlanTypes } from "../../services/read/cache-plan-types.service";
import { PaymentSelector } from "../selectors/payment-selector";
import { PlanSelector } from "../selectors/plan-selector";
import { InsuranceCardSkeleton } from "../skeletons/insurance-card-skeleton";
import { PlansContent } from "./plans-content";
import { Suspense } from 'react';

export const Plans = async () => {
  const planTypes = await getCachedPlanTypes();

  const defaultPlanType = planTypes
    .filter(pt => !['hibrido', 'híbrido'].includes(pt.name.toLowerCase()))
    .sort((a, b) => a.orderIndex - b.orderIndex)[0];

  const { planTypeId, activePaymentType } = await getInsuranceState();

  const currentPlanTypeId = planTypeId ?? defaultPlanType.id;

  const regularPlanTypes = planTypes
    .filter(planType => !['hibrido', 'híbrido'].includes(planType.name.toLowerCase()))
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const currentPlanType = currentPlanTypeId
    ? regularPlanTypes.find(planType => planType.id === currentPlanTypeId) ?? defaultPlanType
    : defaultPlanType;

  const paymentTypes = ["Mensual", "Anual"];

  return (

    <div className="mx-auto px-4 space-y-4 mb-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelector
          planTypes={regularPlanTypes}
          planTypeId={currentPlanType.id}
        />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      {/* Solo el contenido de las cards con Suspense */}
      <Suspense
        key={currentPlanTypeId}
        fallback={
          <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
            {[1, 2, 3].map((i) => (
              <InsuranceCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <PlansContent
          planTypeId={currentPlanTypeId}
          regularPlanTypes={regularPlanTypes}
          currentPlanType={currentPlanType}
          activePaymentType={activePaymentType}
        />
      </Suspense>
    </div>
  );
};
