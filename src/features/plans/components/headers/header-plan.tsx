"use client";

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";

export const HeaderPlanType = () => {
  const { openAddPlanTypeModal } = usePlanTypeActions();
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-6">
        <section>
          <h3 className="font-semibold text-lg text-foreground">Tipos de Planes</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-6">
            Visión general de los diferentes tipos de planes
          </p>
        </section>
        <Button
          className="flex items-center flex-row gap-1"
          onClick={openAddPlanTypeModal}
        >
          <Plus size={20} />
          <span className="m-0 text-sm hidden lg:block">
            Nuevo tipo de plan
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};
