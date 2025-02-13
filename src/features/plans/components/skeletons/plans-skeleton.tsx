import { PlanSelectorSkeleton } from "./plan-selector-skeleton";
import { PaymentSelectorSkeleton } from "./payment-selector-skeleton";
import { InsuranceCardSkeleton } from "./insurance-card-skeleton";

export const PlansSkeleton = () => {
  return (
    <div className="mx-auto px-4 py-2 space-y-4 m-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelectorSkeleton />
        <PaymentSelectorSkeleton />
      </div>
      <div className="w-11/12 mx-auto flex-col gap-4 xl:grid xl:grid-flow-col justify-center lg:auto-cols-max items-end">
        {[1, 2].map((i) => (
          <InsuranceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
