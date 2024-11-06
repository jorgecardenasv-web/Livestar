"use client";

import { Card } from "@tremor/react";

export const HeaderProspects = () => {
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
    </Card>
  );
};
