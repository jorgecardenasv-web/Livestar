"use client";

import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { usePlanTypeForm } from "../../hooks/use-plan-type-form";
import { createPlanType } from "../../actions/create-plan-type";

export const CreatePlanTypeForm = () => {
  const { modalProps } = usePlanTypeActions();
  const { formAction } = usePlanTypeForm(createPlanType);

  return (
    <form className="space-y-4" action={formAction}>
      <TextInput
        label="Nombre"
        name="name"
        defaultValue={modalProps?.name}
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
