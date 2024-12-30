import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { useInsuranceForm } from "../../hooks/use-insurance-form";
import { deleteInsurance } from "../../actions/delete-insurance";

export const DeleteInsuranceForm = () => {
  const {
    handleCancel,
    modalProps: { insurance },
  } = useInsuranceActions();

  const { handleDeleteInsurance } = useInsuranceForm(deleteInsurance);

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
        <SubmitButton
          textStatic="Eliminar"
          color="red"
          className="flex-1"
          textPending="Eliminando..."
          onClick={() => handleDeleteInsurance(insurance.id)}
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
