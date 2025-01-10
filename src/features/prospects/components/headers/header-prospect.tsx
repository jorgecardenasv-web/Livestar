"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { useProspectActions } from "../../hooks/use-prospect-actions";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const HeaderProspects = () => {
  const { openXlsxModal } = useProspectActions();

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-6">
        <section>
          <h3 className="font-semibold text-lg text-foreground">Prospectos</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-6">
            Visión general de todos los prospectos registrados.
          </p>
        </section>
        <Button
          className="flex items-center flex-row gap-1"
          onClick={openXlsxModal}
        >
          <FileSpreadsheet size={20} />
          <span className="m-0 text-sm hidden lg:block">Crear reporte</span>
        </Button>
      </CardContent>
    </Card>
  );
};
