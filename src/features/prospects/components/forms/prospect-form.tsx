"use client";

import { useProspectActions } from "../../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { statusProspects } from "../../data";
import { Button } from "@/shared/components/ui/button";
import { SelectInput } from "@/shared/components/ui/select-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";

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

      <div className="flex justify-end mt-4">
        <SubmitButton
          type="submit"
          label="Guardar"
          className="h-12 w-full text-md"
          labelPending="Guardando..."
        />
      </div>
    </form>
  );
};
