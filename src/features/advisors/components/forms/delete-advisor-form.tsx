import { UserStatus } from "@prisma/client";

import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { deleteAdvisor } from "../../actions/delete-advisor";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const DeleteAdvisorForm = () => {
  const {
    handleCancel,
    advisor,
    closeModal,
  } = useAdvisorActions();

  const { showNotification } = useNotificationStore();

  const deleteAdvisorWithId = deleteAdvisor.bind(null, advisor?.id);

  const [state, formAction] = useFormState(deleteAdvisorWithId, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      showNotification(state.message, "success");
    }

    if (!state?.success && state?.message) {
      closeModal();
      showNotification(state.message, "error");
    }
  }, [state.success, state.message, closeModal, showNotification]);


  return (
    <>
      <Callout title="Asesor a eliminar" className="mt-4" variant="error">
        <div className="flex flex-row gap-2 mb-1">
          <p>Nombre:</p>
          <p className="font-semibold">{advisor?.name}</p>
        </div>
        <div className="flex flex-row gap-2 mb-1">
          <p>Email:</p>
          <p className="font-semibold">{advisor?.email}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mb-1">
          <p>Status:</p>
          <p>
            {advisor.status === UserStatus.ACTIVO ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="destructive">Inactivo</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">{advisor?.createdAt.toLocaleString()}</p>
        </div>
      </Callout>
      <div className="mt-8 w-full flex flex-row gap-2">
        <form action={formAction} className="flex-1">
          <SubmitButton
            label="Eliminar"
            className="w-full"
            labelPending="Eliminando..."
          />
        </form>
        <Button
          variant="outline"
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
