import { SubmitButton } from "@/shared/components/submit-button";
import { Badge, Button, Select, SelectItem, TextInput } from "@tremor/react";
import { UserStatus } from "@prisma/client";
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { editAdvisor } from "../../actions/edit-advisor";

export const EditAdvisorForm = () => {
  const {
    formAction,
    state,
    handleCancel,
    modalProps: { advisor },
  } = useAdvisorActions(editAdvisor);

  return (
    <form action={formAction} className="mt-5">
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
          Nombre completo
        </p>
        <TextInput
          placeholder=""
          type="text"
          id="name"
          name="name"
          required
          defaultValue={advisor?.name}
          error={Boolean(state?.errors?.name?.length)}
          errorMessage={state?.errors?.name}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
          Email
        </p>
        <TextInput
          type="email"
          placeholder=""
          id="email"
          name="email"
          defaultValue={advisor?.email}
          required
          error={Boolean(state?.errors?.email?.length)}
          errorMessage={state?.errors?.email}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 leading-5 text-tremor-default  dark:text-dark-tremor-content text-dark-tremor-background">
          Estatus
        </p>
        <Select
          defaultValue={advisor?.status === UserStatus.ACTIVE ? "1" : "2"}
          id="status"
          name="status"
          required
        >
          <SelectItem value="1">
            <Badge color="green">Activo</Badge>
          </SelectItem>
          <SelectItem value="2">
            <Badge color="red">Inactivo</Badge>
          </SelectItem>
        </Select>
      </div>

      <div className="mt-8 w-full flex flex-row gap-2">
        <SubmitButton
          textStatic="Editar Asesor"
          className="flex-1"
          textPending="Editando Asesor..."
        />
        <Button
          variant="secondary"
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
