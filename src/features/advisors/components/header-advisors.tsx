"use client";

import { useAdvisorActions } from "../hooks/use-advisor-actions";
import { UserRoundPlus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export const HeaderAdvisors = () => {
  const { openAddAdvisorModal } = useAdvisorActions();
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-6">
        <section>
          <h3 className="font-semibold text-lg text-foreground">Asesores</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-6">
            Visión general de todos los asesores registrados en tu organización.
          </p>
        </section>
        <Button
          className="flex items-center flex-row gap-1"
          onClick={openAddAdvisorModal}
        >
          <UserRoundPlus size={20} />
          <span className="m-0 text-sm hidden lg:block">Crear asesor</span>
        </Button>
      </CardContent>
    </Card>
  );
};
