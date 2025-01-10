import { SubmitButton } from "@/shared/components/ui/submit-button";
import { UserStatus } from "@prisma/client";
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { updateAdvisor } from "../../actions/update-advisor";
import { Badge } from "@/shared/components/ui/badge";
import { TextInput } from "@/shared/components/ui/text-input";
import { SelectInput } from "@/shared/components/ui/select-input";
import { Button } from "@/shared/components/ui/button";
import { useAdvisorForm } from "../../hooks/use-advisor-form";

export const UpdateAdvisorForm = () => {
  const {
    handleCancel,
    modalProps: advisor,
  } = useAdvisorActions();

  const { formAction, state } = useAdvisorForm(updateAdvisor);

  return (
    <form action={formAction} className="mt-5 space-y-5">
      <TextInput
        label="Nombre completo"
        placeholder="Escribe el nombre completo del asesor"
        type="text"
        id="name"
        name="name"
        required
        defaultValue={advisor?.name}
        error={state?.inputErrors?.name}
      />
      <TextInput
        type="email"
        label="Correo electrónico"
        placeholder=""
        id="email"
        name="email"
        defaultValue={advisor?.email}
        required
        error={state?.inputErrors?.email}
      />

      <SelectInput
        options={[
          { label: "Activo", value: "1" },
          { label: "Inactivo", value: "2" },
        ]}
        label="Estatus"
        name="status"
        defaultValue={advisor?.status === UserStatus.ACTIVE ? "1" : "2"}
        required
      />

      <div className="mt-8 w-full flex flex-row gap-2">
        <SubmitButton
          label="Editar Asesor"
          className="flex-1"
          labelPending="Editando Asesor..."
        />
        <Button
          variant="outline"
          type="button"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
