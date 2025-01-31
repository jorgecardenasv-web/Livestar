"use client";

import { useState } from "react";
import { CreateContract } from "../../actions/create-quote";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useFormState } from "react-dom";
import { Callout } from "@/shared/components/ui/callout";

export const ContractForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [state, formAction] = useFormState(CreateContract, {
    message: "",
    success: false
  });

  return (
    <form className="mt-5" action={formAction}>
      <Alert variant="default" className="mb-4">
        <AlertCircle className="h-4 w-4" color="black" />
        <AlertTitle>Aviso</AlertTitle>
        <AlertDescription>
          <div className="flex items-center space-x-2 my-4">
            <p>
              Esta cotización es informativa y debe ser confirmada con un
              asesor. Los valores presentados son aproximados y están sujetos a
              ajustes según los planes y tarifas vigentes. Se recomienda
              consultar directamente para obtener cifras precisas y
              actualizadas. Es importante destacar que los montos pueden variar
              según la cobertura elegida y las condiciones específicas del
              asegurado.
            </p>
          </div>
        </AlertDescription>
      </Alert>
      <Alert variant="important" className="mb-4">
        <AlertCircle className="h-4 w-4" color="#ca8a04" />
        <AlertTitle>¡Importante!</AlertTitle>
        <AlertDescription>
          <div className="flex items-center space-x-2 my-4">
            <input
              type="checkbox"
              id="confirmation"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="h-4 w-4 text-[#223E99] focus:ring-[#223E99] border-gray-300 rounded"
            />
            <label htmlFor="confirmation">
              Confirmo que no padezco ninguna enfermedad preexistente ni me
              encuentro en estado de embarazo
            </label>
          </div>
        </AlertDescription>
      </Alert>

      <SubmitButton
        label="Contratar ahora"
        labelPending="Generando confirmación..."
        className="w-full"
        size="lg"
        disabled={!isConfirmed}
      />

      {!state.success && state.message && (
        <Callout
          className="mt-4"
          variant={"warning"}
          icon={false}
        >
          {state.message}
        </Callout>
      )}
    </form>
  );
};
