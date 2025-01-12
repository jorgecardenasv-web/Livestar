"use client";

import { ImageInput } from "@/shared/components/ui/image-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { createInsurance } from "../../actions/create-insurance";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useInsuranceForm } from "../../hooks/use-insurance-form";

export const CreateInsuranceForm = () => {
  const { formAction, state } = useInsuranceForm(createInsurance);

  return (
    <form action={formAction} className="space-y-4">
      <ImageInput name="logo" label="Logo" error={state?.inputErrors?.logo} />

      <TextInput
        type="text"
        name="name"
        label="Nombre de la aseguradora"
        placeholder="Escribe el nombre de la aseguradora"
        error={state?.inputErrors?.name}
      />

      <SubmitButton
        className="w-full"
        label="Crear aseguradora"
        labelPending="Creando aseguradora..."
      />
    </form>
  );
};
