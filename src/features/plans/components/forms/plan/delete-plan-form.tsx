"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { usePlanActions } from "../../../hooks/use-plan-actions";
import { formatCurrency } from "@/shared/utils";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useFormState } from "react-dom";
import { deletePlan } from "../../../actions/delete-plan";
import { useEffect } from "react";

export const DeletePlanForm = () => {
  const { handleCancel, plan } = usePlanActions();

  const { showNotification } = useNotificationStore()

  const deletePlanWithId = deletePlan.bind(null, plan?.id)

  const [state, formAction] = useFormState(deletePlanWithId, {
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
          <p className="font-semibold">{plan?.planType?.name}</p>
        </div>
        <div className="flex flex-row gap-2 mb-1">
          <p>Compañía:</p>
          <p className="font-semibold">{plan?.company?.name}</p>
        </div>
        <div className="flex flex-row gap-2 mb-1">
          <p>Suma Asegurada:</p>
          <p className="font-semibold">{formatCurrency(plan?.sumInsured)}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mb-1">
          <p>Coaseguro:</p>
          <p className="font-semibold">
            {typeof plan?.coInsurance === 'object' && plan?.coInsurance?.value
              ? `${plan.coInsurance.value}%`
              : typeof plan?.coInsurance === 'number'
                ? `${plan.coInsurance}%`
                : 'No disponible'}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2 mb-1">
          <p>Status:</p>
          <p>
            {plan?.status === "ACTIVO" ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="destructive">Inactivo</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">
            {new Date(plan?.createdAt).toLocaleDateString()}
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
