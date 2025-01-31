import { HeaderProspects } from "@/features/prospects/components/headers/header-prospect";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { Prospect } from "@prisma/client";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ListProspects } from "@/features/prospects/components/tables/list-prospects";
import { ModalProspectActions } from "@/features/prospects/components/modals/modal-prospect-actions";
import { Suspense } from "react";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";

export interface Params extends Prospect {
  page: string;
  query?: string;
}

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const advisors = await getAdvisors();

  return (
    <>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <HeaderProspects />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <ListProspects params={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalProspectActions advisors={advisors} />
      </div>
    </>
  );
}
