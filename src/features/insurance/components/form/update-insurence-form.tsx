"use client";

import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { useInsuranceForm } from "../../hooks/use-insurance-form";
import { ImageInput } from "@/shared/components/ui/image-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { updateInsurance } from "../../actions/update-insurence";
import { useEffect, useState } from "react";
import { getImage, ImageResponse } from "@/shared/services/get-image.service";

export const UpdateInsuranceForm = () => {
  const { insurance } = useInsuranceActions();
  const { formAction, state } = useInsuranceForm(updateInsurance);
  const { logo, name } = insurance;

  const [logoInsurance, setLogoInsurance] = useState<ImageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      if (!logo) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getImage(logo);
        setLogoInsurance(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchImage();
  }, [logo]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <form action={formAction} className="space-y-4">
        <ImageInput
          name="logo"
          label="Logo"
          error={state?.inputErrors?.logo}
          defaultValue={logoInsurance}
        />

        <TextInput
          type="text"
          name="name"
          label="Nombre de la aseguradora"
          placeholder="Escribe el nombre de la aseguradora"
          error={state?.inputErrors?.name}
          defaultValue={name}
        />

        <SubmitButton
          className="w-full"
          label="Actualizar aseguradora"
          labelPending="Actualizando aseguradora..."
        />
      </form>
    </>
  );
};
