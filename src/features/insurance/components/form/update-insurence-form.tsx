import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { useInsuranceForm } from "../../hooks/use-insurance-form";
import { ImageInput } from "@/shared/components/ui/image-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { updateInsurance } from "../../actions/update-insurence";

export const UpdateInsuranceForm = () => {
  const { handleCancel, insurance } = useInsuranceActions();
  const { formAction, state } = useInsuranceForm(updateInsurance);
  const { logo, name } = insurance;
  return (
    <>
      <form action={formAction} className="space-y-4">
        <ImageInput
          name="logo"
          label="Logo"
          error={state?.inputErrors?.logo}
          defaultValue={logo}
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
