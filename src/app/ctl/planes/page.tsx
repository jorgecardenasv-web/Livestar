import { HeaderPlans } from "@/features/plans/components/header/header-plans";
import { PlansList } from "@/features/plans/components/table/list-plans";
import { getPlans } from "@/features/plans/loaders/get-plans";
import { Pagination } from "@/shared/components/pagination";
import { Card, CardContent } from "@/shared/components/ui/card";

export default async function Planes() {
  const { plans, insurancesPerPage, totalPages, totalPlans } = await getPlans();

  return (
    <>
      <HeaderPlans />
      <Card>
        <CardContent className="space-y-6 p-6">
          <PlansList plans={plans} />
          <Pagination
            totalPages={totalPages}
            totalItems={totalPlans}
            itemsPerPage={insurancesPerPage}
            itemName="Aseguradora"
          />
        </CardContent>
      </Card>
    </>
  );
}
