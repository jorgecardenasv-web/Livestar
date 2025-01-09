"use client";

import { ImageInput } from "@/shared/components/ui/image-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { addInsurance } from "../../actions/add-insurance";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { useInsuranceForm } from "../../hooks/use-insurance-form";

export const AddInsuranceForm = () => {
  const { formAction, state } = useInsuranceForm(addInsurance);

  return (
    <form action={formAction} className="space-y-4">
      <ImageInput name="logo" label="Logo" error={state?.errors?.logo} />

      <TextInput
        type="text"
        name="name"
        label="Nombre de la aseguradora"
        placeholder="Escribe el nombre de la aseguradora"
        error={state?.errors?.name}
      />

      <SubmitButton
        className="w-full"
        label="Crear aseguradora"
        labelPending="Creando aseguradora..."
      />
    </form>
  );
};
