import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { deleteInsurance } from "../../actions/delete-insurance";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const DeleteInsuranceForm = () => {
  const { handleCancel, insurance } = useInsuranceActions();
  const { showNotification } = useNotificationStore();

  const deleteInsuranceWithId = deleteInsurance.bind(null, insurance.id);

  const [state, formAction] = useFormState(deleteInsuranceWithId, {
    success: false,
    message: ""
  })

  useEffect(() => {
    if (state.success) {
      handleCancel();
      showNotification(state.message, "success");
    }
  }, [state?.success, state.message, showNotification]);


  return (
    <>
      <Callout title="Aseguradora a eliminar" className="mt-4" variant="error">
        <div className="flex flex-row gap-2 mb-1">
          <p>Nombre:</p>
          <p className="font-semibold">{insurance?.name}</p>
        </div>

        <div className="flex flex-row items-center gap-2 mb-1">
          <p>Status:</p>
          <p>
            {insurance.status ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="destructive">Inactivo</Badge>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">
            {insurance?.createdAt.toLocaleString()}
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
