"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form";
import { QUESTIONS } from "@/features/quote/data";
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form";
import { useState } from "react";
import { useQuoteStore } from "@/features/quote/store/quote-store";

const INITIAL_HEALTH_CONDITION = {
  hospitalizado: "No",
  complicacion: "No",
  estadoSalud: "Sano",
  medicamento: "No",
  nombrePadecimiento: "",
  tipoEvento: "",
  tipoTratamiento: "",
  detalleComplicacion: "",
  detalleMedicamento: "",
};

export const ContractForm = ({prospect}: any) => {
  // const { pending } = useFormStatus();

  const createInitialMedicalForms = (questions: any[]) =>
  questions.map((question) => ({
    [`answer-${question.id}`]: "No",
    healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  }));

  const [medicalForm, setMedicalForm] = useState<any[]>(() =>
      QUESTIONS
        ? createInitialMedicalForms(QUESTIONS) : []
    );

  const [medicalErrors, setMedicalErrors] = useState<Record<string, string>>(
  {}
  );

  const { prospect: prospectStore } = useQuoteStore()
  console.log(prospectStore)

  return (
    <div className="mt-5">
      <Alert variant="important" className="mb-4">
        <AlertCircle className="h-4 w-4" color="#ca8a04" />
        <AlertTitle>¡Importante!</AlertTitle>
        <AlertDescription>
          <div className="flex items-center space-x-2 my-4">
            <label htmlFor="confirmation">
              Cualquier padecimiento preexistente a la contratación del seguro estará excluida de las coberturas.
            </label>
          </div>
        </AlertDescription>
      </Alert>

      {/* <Button className="w-full py-6 text-lg" disabled={pending}>
        <Link href="/finalizar-cotizacion" className="w-full">
          {pending ? "Continuando..." : "Continuar cotización"}
        </Link>
      </Button> */}
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

      <form onSubmit={(e) => {
        e.preventDefault()
        console.log("form", medicalForm)
      }}>

        <input type="hidden" name="medicalData" value={JSON.stringify(medicalForm)} />

        <MedicalInformationForm
          forms={medicalForm}
          setForms={setMedicalForm}
          questions={QUESTIONS}
          formFamily={prospectStore}
          errors={medicalErrors}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="font-semibold text-lg"
            disabled={false}
          >
            {/* {isSubmitting ? (<><Loader2 className="w-6 h-6 mr-2 animate-spin" />Enviando...</>) : "Enviar solicitud"} */}
            Enviar
          </Button>
        </div>

      </form>
    </div>
  );
};
