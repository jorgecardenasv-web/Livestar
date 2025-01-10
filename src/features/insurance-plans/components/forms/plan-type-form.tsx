"use client";

import { SelectInput } from "@/shared/components/ui/select-input";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { usePlanTypeForm } from "../../hooks/use-plan-type-form";
import { updatePlanType } from "../../actions/edit-plan-type";

export const PlanTypeForm = () => {
  const { modalProps } = usePlanTypeActions();
  const { formAction } = usePlanTypeForm(updatePlanType);

  return (
    <form className="space-y-4" action={formAction}>
      <TextInput
        label="Nombre"
        name="name"
        defaultValue={modalProps?.name}
        required
      />

      <SelectInput
        label="Estado"
        name="status"
        defaultValue={modalProps?.status}
        options={[
          {
            value: "ACTIVE",
            label: "Activo",
          },
          {
            value: "INACTIVE",
            label: "Inactivo",
          },
        ]}
        required
      />

      <SubmitButton
        label="Guardar"
        labelPending="Guardando..."
        className="w-full bg-primary text-white px-6 py-3 rounded font-bold text-lg mt-10"
      />
    </form>
  );
};
