import { ListPlanTypes } from "@/features/plans/components/tables/list-plan-types";
import { getPlanTypes } from "@/features/plans/loaders/get-plan-types";
import { Card, CardContent } from "@/shared/components/ui/card";
import { HeaderPlanType } from "@/features/plans/components/headers/header-plan";
import { ModalPlanTypeActions } from "@/features/plans/components/modals/modal-plan-type-actions";
import { Suspense } from "react";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";
import { PlanType } from "@prisma/client";

export interface Params extends PlanType {
  page: string;
  query?: string;
}

export default function TipoDePlanes({
  searchParams,
}: {
  searchParams: Params;
}) {
  return (
    <>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <HeaderPlanType />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <ListPlanTypes params={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalPlanTypeActions />
      </div>
    </>
  );
}
