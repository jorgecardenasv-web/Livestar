import { PlanTypeStatus } from "@prisma/client";
import { getInsuranceState } from "../../loaders/get-insurance-status";
import { getPlanTypes } from "../../loaders/get-plan-types";
import { PaymentSelector } from "../selectors/payment-selector";
import { PlanSelector } from "../selectors/plan-selector";
import { InsuranceCardSkeleton } from "../skeletons/insurance-card-skeleton";
import { PlansContent } from "./plans-content";
import { Suspense } from 'react';

export const Plans = async () => {
  const {
    data: { items: planTypes },
  } = await getPlanTypes({
    page: "1",
    offset: "100",
    status: PlanTypeStatus.ACTIVO,
  });

  const selectorPlanTypes = planTypes
    .filter(planType => !['hibrido', 'híbrido'].includes(planType.name.toLowerCase()))
    .sort((a, b) => a.orderIndex - b.orderIndex);

  if (planTypes.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No hay planes disponibles en este momento.</p>
      </div>
    );
  }

  const defaultPlanType = selectorPlanTypes[0];
  const { planTypeId, activePaymentType } = await getInsuranceState();
  const currentPlanTypeId = planTypeId ?? defaultPlanType?.id;
  const currentPlanType = selectorPlanTypes.find(planType => planType.id === currentPlanTypeId) ?? defaultPlanType;

  const paymentTypes = ["Mensual", "Anual"];

  return (
    <div className="mx-auto px-4 space-y-4 mb-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelector
          planTypes={selectorPlanTypes}
          planTypeId={currentPlanType?.id}
        />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      <Suspense
        key={currentPlanTypeId}
        fallback={
          <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
            {[1, 2].map((i) => (
              <InsuranceCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <PlansContent
          planTypeId={currentPlanTypeId}
          regularPlanTypes={planTypes}
          currentPlanType={currentPlanType}
          activePaymentType={activePaymentType}
        />
      </Suspense>
    </div>
  );
};
