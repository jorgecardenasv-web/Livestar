"use client";

import { Card } from "@tremor/react";
import { UserRoundPlus } from "lucide-react";

export const HeaderSessions = () => {
  return (
    <Card className="flex flex-row items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <section>
        <h3 className="font-semibold text-lg text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Sesiones
        </h3>
        <p className="mt-1 text-tremor-default leading-6">
          Visión general de todas las sesiones activas en tu organización.
        </p>
      </section>
    </Card>
  );
};
