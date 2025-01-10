import { HeaderInsurance } from "@/features/insurance/components/header/header-insurance";
import { ModalInsuranceActions } from "@/features/insurance/components/modal/modal-insurance-actions";
import { ListInsurance } from "@/features/insurance/components/table/list-insurance";
import { getInsurance } from "@/features/insurance/loaders/get-insurance";
import { Pagination } from "@/shared/components/pagination";
import { Card, CardContent } from "@/shared/components/ui/card";

export default async function Aseguradoras() {
  const { insurances, totalPages, insurancesPerPage, totalInsurances } =
    await getInsurance();

  return (
    <>
      <HeaderInsurance />
      <Card>
        <CardContent className="space-y-6 p-6">
          <ListInsurance insurances={insurances} />
          <Pagination
            totalPages={totalPages}
            totalItems={totalInsurances}
            itemsPerPage={insurancesPerPage}
            itemName="Aseguradora"
          />
        </CardContent>
      </Card>

      <ModalInsuranceActions />
    </>
  );
}
