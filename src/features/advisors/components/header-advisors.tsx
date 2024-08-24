"use client";

import { Card } from "@tremor/react";
import { ModalAdvisorActions } from "./modal-advisor-actions";
import { useAdvisorActions } from "../hooks/use-advisor-actions";
import { UserRoundPlus } from "lucide-react";

export const HeaderAdvisors = () => {
  const { openAddAdvisorModal } = useAdvisorActions();
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
      <button
        className="flex items-center flex-row bg-primary p-3 gap-1 rounded-md text-white text-base"
        onClick={openAddAdvisorModal}
      >
        <UserRoundPlus size={20} />
        <span className="m-0 text-sm hidden lg:block">Crear asesor</span>
      </button>
    </Card>
  );
};
