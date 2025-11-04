"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Separator } from "@radix-ui/react-select";
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form";
import { QUESTIONS } from "@/features/quote/data";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";

export const ContractForm = (prospect: any) => {
  const { handleSubmit,forms, setForms, formData } = useQuoteSumaryActions(prospect)
  const { pending } = useFormStatus();

  return (
    <div className="mt-5">
      <Alert variant="important" className="mb-4">
        <AlertCircle className="h-4 w-4" color="#ca8a04" />
        <AlertTitle>¡Importante!</AlertTitle>
        <AlertDescription>
          <div className="flex items-center space-x-2 my-4">
            {/* <input
              type="checkbox"
              id="confirmation"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="h-4 w-4 text-[#223E99] focus:ring-[#223E99] border-gray-300 rounded"
            /> */}
            <label htmlFor="confirmation">
              Entiendo que cualquier padecimiento preexistente a la contratación
              del seguro estará excluida en mis coberturas
            </label>
          </div>
        </AlertDescription>
      </Alert>

      <Button className="w-full py-6 text-lg" disabled={pending}>
        <Link href="/finalizar-cotizacion" className="w-full">
          {pending ? "Continuando..." : "Continuar cotización"}
        </Link>
      </Button>
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

      <Separator />

      <form onSubmit={handleSubmit}>

        <MedicalInformationForm
          forms={forms}
          setForms={setForms}
          questions={QUESTIONS}
          formFamily={formData}
          errors={currentMedicalErrors}
        />

      </form>
    </div>
  );
};
