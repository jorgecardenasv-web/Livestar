"use client";

import { useProspectActions } from "../../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { statusProspects } from "../../data";
import { Button } from "@/shared/components/ui/button";
import { SelectInput } from "@/shared/components/ui/select-input";

export const ProspectForm = ({ advisors }: { advisors: Advisor[] }) => {
  const { formAction, modalProps } = useProspectActions();

  return (
    <form className="space-y-4" action={formAction}>
      <SelectInput
        label="Estado"
        name="status"
        defaultValue={modalProps?.prospect?.status}
        options={statusProspects.map((datasource) => ({
          value: datasource.value,
          label: datasource.name,
        }))}
      />

      <SelectInput
        label="Asesor asignado"
        name="userId"
        defaultValue={modalProps?.prospect?.user?.uuid}
        options={advisors.map((advisor) => ({
          value: advisor.id,
          label: advisor.name,
        }))}
      />

      <Button
        type="submit"
        className="w-full bg-primary text-white px-6 py-3 rounded font-bold text-lg mt-10"
      >
        Guardar
      </Button>
    </form>
  );
};
