import { HeaderInsurance } from "@/features/insurance/components/header/header-insurance";
import { ModalInsuranceActions } from "@/features/insurance/components/modal/modal-insurance-actions";
import { ListInsurance } from "@/features/insurance/components/table/list-insurance";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Insurance } from "@generated/prisma/client";
import { Suspense } from "react";

export interface Params extends Insurance {
  page: string;
  query?: string;
}

export default async function Aseguradoras({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <HeaderInsurance />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <ListInsurance params={resolvedSearchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalInsuranceActions />
      </div>
    </>
  );
}
