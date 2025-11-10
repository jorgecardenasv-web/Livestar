"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form";
import { QUESTIONS } from "@/features/quote/data";
import { useEffect, useState } from "react";
import { useQuoteStore } from "@/features/quote/store/quote-store";
import { removeCookies, updateQuote } from "@/features/quote/actions/update-quote";
import { useFormState } from "react-dom";
import { useNotificationStore } from "@/features/notification/store/notification-store";

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

export const ContractForm = ({ prospect }: { prospect: any }) => {
  const router = useRouter();

  const updateUserWithId = prospect.quoteId ? updateQuote.bind(null, prospect.quoteId) : null
  const [state, formAction] = useFormState(
    updateUserWithId || (() => ({ message: "Error: No se pudo encontrar la cotización", success: false, inputErrors: {} })),
    {
      message: "",
      success: false,
      inputErrors: {},
    }
  )

  const { showNotification } = useNotificationStore()

  useEffect(() => {
    if (state.success) {
      removeCookies();
      router.replace(`/cotizar/flow`);
      showNotification(state.message, "success")
    }

    setIsSubmitting(false);
  }, [state, showNotification])

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  console.log("Medical Form:", medicalForm);

  const { prospect: prospectStore } = useQuoteStore()

  return (
    <div className="mt-5">
      <div className="border border-yellow-500 rounded-md p-4 mb-4 bg-transparent">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ca8a04">
            <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
            <line x1="12" y1="8" x2="12" y2="12" stroke-width="2"></line>
            <line x1="12" y1="16" x2="12" y2="16" stroke-width="2"></line>
          </svg>
          <h4 className="font-semibold text-lg text-yellow-700">¡Importante!</h4>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <label htmlFor="confirmation" className="text-gray-800 leading-relaxed">
            Cualquier padecimiento preexistente a la contratación del seguro estará excluido de las coberturas.
          </label>
        </div>
      </div>

      <div className="mt-4 border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
            <line x1="12" y1="8" x2="12" y2="12" stroke-width="2"></line>
            <circle cx="12" cy="16" r="1" stroke-width="2" fill="currentColor"></circle>
          </svg>
          <h3 className="font-semibold text-gray-800">Aviso</h3>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            Esta cotización es informativa y debe ser confirmada con un asesor. Los valores presentados son aproximados y están sujetos a ajustes según los planes y tarifas vigentes.
            Se recomienda consultar directamente para obtener cifras precisas y actualizadas.
            Es importante destacar que los montos pueden variar según la cobertura elegida y las condiciones específicas del asegurado.
          </p>
        </div>
      </div>

      <Separator />

      <form action={formAction}>

        <input type="hidden" name="medicalData" value={JSON.stringify(medicalForm)} />
        <input type="hidden" name="prospect" value={JSON.stringify(prospect)} />

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
            disabled={isSubmitting}
          >
            {isSubmitting ? (<><Loader2 className="w-6 h-6 mr-2 animate-spin" />Enviando...</>) : "Enviar solicitud"}
          </Button>
        </div>

      </form>
    </div>
  );
};
