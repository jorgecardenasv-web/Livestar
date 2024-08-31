import { Badge, Button, Callout } from "@tremor/react";
import { UserStatus } from "@prisma/client";
import { SubmitButton } from "@/shared/components/submit-button";
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { deleteAdvisor } from "../../actions/delete-advisor";

export const DeleteAdvisorForm = () => {
  const {
    handleCancel,
    handleDeleteAdvisor,
    modalProps: { advisor },
  } = useAdvisorActions(deleteAdvisor);

  return (
    <>
      <Callout title="Asesor a eliminar" className="mt-4" color="red">
        <div className="flex flex-row gap-2 mb-1">
          <p>Nombre:</p>
          <p className="font-semibold">{advisor?.name}</p>
        </div>
        <div className="flex flex-row gap-2 mb-1">
          <p>Email:</p>
          <p className="font-semibold">{advisor?.email}</p>
        </div>
        <div className="flex flex-row gap-2 mb-1">
          <p>Status:</p>
          <p>
            {advisor.status === UserStatus.ACTIVE ? (
              <Badge color="green">Activo</Badge>
            ) : (
              <Badge color="red">Inactivo</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">{advisor?.createdAt.toLocaleString()}</p>
        </div>
      </Callout>

      <div className="mt-8 w-full flex flex-row gap-2">
        <SubmitButton
          textStatic="Eliminar"
          color="red"
          className="flex-1"
          textPending="Eliminando..."
          onClick={() => handleDeleteAdvisor(advisor.id)}
        />
        <Button
          variant="secondary"
          color="red"
          type="button"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
    </>
  );
};
