import { ListPlanTypes } from "@/features/insurance-plans/components/tables/list-plan-types";
import { getPlanTypes } from "@/features/insurance-plans/loaders/get-plan-types";
import { Card, CardContent } from "@/shared/components/ui/card";
import { HeaderPlanType } from "@/features/insurance-plans/components/headers/header-plan";
import { ModalPlanTypeActions } from "@/features/insurance-plans/components/modals/modal-plan-actions";

export default async function TipoDePlanes() {
  const planTypes = await getPlanTypes();
  return (
    <>
      <HeaderPlanType />
      <Card>
        <CardContent className="space-y-6 p-6">
          <ListPlanTypes planTypes={planTypes} />
        </CardContent>
      </Card>
      <ModalPlanTypeActions />
    </>
  );
}
