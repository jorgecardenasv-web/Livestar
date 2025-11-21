"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ContractForm = () => {
  return (
    <div className="mt-5">
      <Alert variant="important" className="mb-4">
        <AlertCircle className="h-4 w-4" color="#ca8a04" />
        <AlertTitle>¡Importante!</AlertTitle>
        <AlertDescription>
          <p className="my-4">
            Cualquier padecimiento preexistente a la contratación del seguro estará excluida de las coberturas.
          </p>
        </AlertDescription>
      </Alert>
      {/* Aviso informativo; no requiere interacción ni habilita acciones */}
      <Alert variant="default" className="mt-4">
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
    </div>
  );
};
