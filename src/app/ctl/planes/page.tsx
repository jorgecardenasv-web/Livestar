import { HeaderPlans } from "@/features/insurance-plans/components/headers/header-plans";
import { PlansList } from "@/features/insurance-plans/components/tables/list-plans";
import { Pagination } from "@/shared/components/pagination";
import { Card, CardContent } from "@/shared/components/ui/card";
import { getPlans } from "@/features/insurance-plans/loaders/get-plans";
import { getInsuranceLogosFromPlans } from "@/features/insurance-plans/loaders/get-company-logos";

export default async function Planes() {
  const { plans, insurancesPerPage, totalPages, totalPlans } = await getPlans();

  const companyLogos = await getInsuranceLogosFromPlans(plans);

  return (
    <>
      <HeaderPlans />
      <Card>
        <CardContent className="space-y-6 p-6">
          <PlansList plans={plans} companyLogos={companyLogos} />
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
