"use client";

import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { createPlanType } from "@/features/plans/actions/create-plan-type";
import { usePlanTypeActions } from "@/features/plans/hooks/use-plan-type-actions";
import { usePlanTypeForm } from "@/features/plans/hooks/use-plan-type-form";

export const CreatePlanTypeForm = () => {
  const { planType } = usePlanTypeActions();
  const { formAction } = usePlanTypeForm(createPlanType);

  return (
    <form className="space-y-4" action={formAction}>
      <TextInput
        label="Nombre"
        name="name"
        defaultValue={planType?.name}
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
