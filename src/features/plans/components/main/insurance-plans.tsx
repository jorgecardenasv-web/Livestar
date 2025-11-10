import { PlanTypeStatus } from "@prisma/client";
import { getInsuranceState } from "../../loaders/get-insurance-status";
import { getPlanTypes } from "../../loaders/get-plan-types";
import { PaymentSelector } from "../selectors/payment-selector";
import { PlanSelector } from "../selectors/plan-selector";
import { InsuranceCardSkeleton } from "../skeletons/insurance-card-skeleton";
import { PlansGrid } from "./plans-grid";
import { Suspense } from "react";

export const Plans = async () => {
  const {
    data: { items: planTypes },
  } = await getPlanTypes({
    page: "1",
    offset: "100",
    status: PlanTypeStatus.ACTIVO,
  });

  const selectorPlanTypes = planTypes.sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
  
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
  const currentPlanType =
    selectorPlanTypes.find((planType) => planType.id === currentPlanTypeId) ??
    defaultPlanType;

  const paymentTypes = ["Mensual", "Anual"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4 mb-6 sm:mb-8">
      <div className="flex flex-col justify-center items-center w-full">
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
          <div className="w-full flex justify-center mx-auto max-w-[1200px]">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center justify-items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full max-w-md">
                  <InsuranceCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <PlansGrid
          currentPlanType={currentPlanType}
          activePaymentType={activePaymentType}
        />
      </Suspense>
    </div>
  );
};
