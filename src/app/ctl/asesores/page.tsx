import { ModalAdvisorActions } from "@/features/advisors/components/modals/modal-advisor-actions";
import { Card, CardContent } from "@/shared/components/ui/card";
import { HeaderAdvisors } from "@/features/advisors/components/headers/header-advisors";
import { ListAdvisors } from "@/features/advisors/components/tables/list-advisors";
import { Advisor } from "@/features/advisors/types/advisor";
import { Suspense } from "react";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";

export interface Params extends Advisor {
  page: string;
  query?: string;
}

export default function Advisors({
  searchParams,
}: {
  searchParams: Params;
}) {
  return (
    <>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <HeaderAdvisors />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <ListAdvisors params={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalAdvisorActions />
      </div>
    </>
  );
}
