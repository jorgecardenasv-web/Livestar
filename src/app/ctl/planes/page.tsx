import { HeaderPlans } from "@/features/insurance-plans/components/header/header-plans";
import { ModalPlanActions } from "@/features/insurance-plans/components/ui/modal-plan-actions";
import { PlansList } from "@/features/insurance-plans/components/ui/list-plans";
import { Pagination } from "@/shared/components/pagination";
import { Card, CardContent } from "@/shared/components/ui/card";
import { getPlans } from "@/features/insurance-plans/loaders/get-plans";

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
