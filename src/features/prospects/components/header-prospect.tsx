"use client";

import { Card } from "@tremor/react";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Sheet } from "lucide-react";

export const HeaderProspects = () => {
  const { openXlsxModal } = useProspectActions();
  return (
    <Card className="flex flex-row items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <section>
        <h3 className="font-semibold text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Prospectos
        </h3>
        <p className="mt-1 text-tremor-default leading-6">
          Visión general de todos los prospectos registrados.
        </p>
      </section>
      <button
        className="flex items-center flex-row bg-primary p-3 gap-1 rounded-md text-white text-base"
        onClick={openXlsxModal}
      >
        <Sheet size={20} />
        <span className="m-0 text-sm hidden lg:block">Crear reporte</span>
      </button>
    </Card>
  );
};
