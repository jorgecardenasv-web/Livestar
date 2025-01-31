"use client";

import { SelectInput } from "@/shared/components/ui/select-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { usePlanTypeActions } from "@/features/plans/hooks/use-plan-type-actions";
import { usePlanTypeForm } from "@/features/plans/hooks/use-plan-type-form";
import { updatePlanType } from "@/features/plans/actions/update-plan-type";

export const UpdatePlanTypeForm = () => {
  const { planType } = usePlanTypeActions();
  const { formAction } = usePlanTypeForm(updatePlanType);

  return (
    <form className="space-y-4" action={formAction}>
      <TextInput
        label="Nombre"
        name="name"
        defaultValue={planType?.name}
        required
      />

      <SelectInput
        label="Estado"
        name="status"
        defaultValue={planType?.status}
        options={[
          {
            value: "ACTIVO",
            label: "Activo",
          },
          {
            value: "INACTIVO",
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
