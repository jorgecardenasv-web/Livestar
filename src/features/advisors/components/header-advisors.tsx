'use client';

import { Card } from "@tremor/react";
import { ModalAddAdvisors } from "./modal-add-advisors";

export const HeaderAdvisors = () => {
  
  return (
    <Card className="flex flex-row items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <section>
        <h3 className="font-semibold text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Asesores
        </h3>
        <p className="mt-1 text-tremor-default leading-6">
          Visión general de todos los asesores registrados en tu organización.
        </p>
      </section>
      <ModalAddAdvisors />
    </Card>
  );
};
