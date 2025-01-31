import { HeaderPlans } from "@/features/plans/components/headers/header-plans";
import { PlansList } from "@/features/plans/components/tables/list-plans";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ModalPlanActions } from "@/features/plans/components/modals/modal-plan-actions";
import { Suspense } from "react";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";
import { Plan } from "@/shared/types/insurance";

export interface Params extends Plan {
  page: string;
  query?: string;
}

export default function Planes({
  searchParams
}: {
  searchParams: Params;
}) {
  return (
    <>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <HeaderPlans />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <PlansList params={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalPlanActions />
      </div>
    </>
  );
}
