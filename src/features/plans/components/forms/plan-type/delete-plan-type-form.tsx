"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { formatCurrency } from "@/shared/utils";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useActionState } from "react";
import { useEffect } from "react";
import { deletePlanType } from "@/features/plans/actions/delete-plan-type";
import { usePlanTypeActions } from "@/features/plans/hooks/use-plan-type-actions";

export const DeletePlanTypeForm = () => {
  const { handleCancel, planType } = usePlanTypeActions();

  const { showNotification } = useNotificationStore()

  const deletePlanWithId = deletePlanType.bind(null, planType?.id)

  const [state, formAction] = useActionState(deletePlanWithId, {
    message: "",
    success: false
  })

  useEffect(() => {
    if (state.success) {
      handleCancel();
      showNotification(state.message, "success");
    }
  }, [state.success])

  return (
    <>
      <Callout title="Plan a eliminar" className="mt-4" variant="error">
        <div className="flex flex-row gap-2 mb-1">
          <p>Tipo de Plan:</p>
          <p className="font-semibold">{planType?.name}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mb-1">
          <p>Status:</p>
          <p>
            {planType?.status === "ACTIVO" ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="destructive">Inactivo</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">
            {new Date(planType?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Callout>

      <div className="mt-8 w-full flex flex-row gap-2">
        <form action={formAction} className="flex-1">
          <SubmitButton
            label="Eliminar"
            labelPending="Eliminando..."
            className="w-full bg-destructive"
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
      {!state.success && state.message && (
        <Callout
          className="mt-4"
          variant={"warning"}
          icon={false}
        >
          {state.message}
        </Callout>
      )}
    </>
  );
};
