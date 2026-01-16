import { HeaderQuotes } from "@/features/quote/components/headers/header-quotes";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { Prospect } from "@generated/prisma/client";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ModalQuoteActions } from "@/features/quote/components/modals/modal-quote-actions";
import { Suspense } from "react";
import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton";
import { ListQuotes } from "@/features/quote/components/tables/list-quotes";

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
        <HeaderQuotes />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Suspense fallback={<TableSkeleton />}>
              <ListQuotes params={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
        <ModalQuoteActions advisors={advisors} />
      </div>
    </>
  );
}
