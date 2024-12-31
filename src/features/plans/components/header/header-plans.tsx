"use client";

import { BriefcaseMedical } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { usePlanActions } from "../../hooks/use-plan-actions";

export const HeaderPlans = () => {
  const { openAddPlanModal } = usePlanActions();
  
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-6">
        <section>
          <h3 className="font-semibold text-lg text-foreground">Planes</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-6">
            Visión general de todos los planes registrados en tu organización.
          </p>
        </section>
        <Button
          className="flex items-center flex-row gap-1"
          onClick={openAddPlanModal}
        >
          <BriefcaseMedical size={20} />
          <span className="m-0 text-sm hidden lg:block">Nuevo plan</span>
        </Button>
      </CardContent>
    </Card>
  );
};
