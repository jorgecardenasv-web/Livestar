"use client";

import { UserStatus } from "@prisma/client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { usePlanActions } from "../../hooks/use-plan-actions";

export const DeletePlanForm = () => {
  const { handleCancel, modalProps: plan, handleDeletePlan } = usePlanActions();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);

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
          <p className="font-semibold">{plan?.coInsurance * 100}%</p>
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
        <SubmitButton
          label="Eliminar"
          color="red"
          className="flex-1"
          labelPending="Eliminando..."
          onClick={() => handleDeletePlan(plan.id)}
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
    </>
  );
};
