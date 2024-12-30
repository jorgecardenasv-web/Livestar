"use client";
import { ContactInfoSection } from "@/features/insurance-quote/components/contact-info-section";
import { MedicalInformation } from "@/features/insurance-quote/components/medical-information";
import { PersonalInfoSection } from "@/features/insurance-quote/components/personal-info-section";
import { useGetQuoteForm } from "@/features/insurance-quote/hooks/use-get-quote-form";
import { useState } from "react";
import { FormDataMedical, Question } from "@/features/insurance-quote/types";
import { actionCreateMedicalHistory } from "@/features/insurance-quote/actions/create-medical-history";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

const questions: Question[] = [
  {
    id: 0,
    text: "¿Algún solicitante padece o ha padecido alguna enfermedad como hipertensión arterial, infarto, hepatitis, diabetes, epilepsia, esclerosis, fiebre reumática, SIDA, cáncer, tumores, COVID-19; enfermedades mentales, congénitas, inmunológicas u otras de tipo renal, pulmonar, neurológico o cardiovascular?",
  },
  {
    id: 1,
    text: "¿Algún Solicitante ha sido hospitalizado o le han hecho alguna cirugía por cualquier enfermedad, accidente, alteración congénita, reconstructiva o estética?",
  },
  {
    id: 2,
    text: "¿Algún Solicitante padece de alguna lesión, enfermedad, padecimiento o trastorno de salud no referida en la pregunta número 1?",
  },
  {
    id: 3,
    text: "¿Algún Solicitante está en tratamiento de cualquier tipo o tiene programada atención médica o quirúrgica?",
  },
];

export default function QuoteFinalizationClientPage({
  prospect,
}: {
  prospect: any;
}) {
  const {
    formData,
    errors,
    handleChildChange,
    handleInputChange,
    handleProtectedPersonChange,
  } = useGetQuoteForm(prospect);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [forms, setForms] = useState<FormDataMedical[]>(
    questions.map((question) => ({
      [`answer-${question.id}`]: "No",
      healthConditions: [
        {
          hospitalizado: "No",
          complicacion: "No",
          estadoSalud: "Sano",
          medicamento: "No",
          nombrePadecimiento: "",
          tipoEvento: "",
          tipoTratamiento: "",
          detalleComplicacion: "",
          detalleMedicamento: "",
        },
      ],
    }))
  );
  const validateHealthConditions = () => {
    const newErrors: { [key: string]: string } = {};

    forms.forEach((form, questionIndex) => {
      if (form[`answer-${questionIndex}`] === "No") {
        return;
      }

      if (!form.healthConditions || form.healthConditions.length === 0) {
        return;
      }

      form.healthConditions.forEach((healthCondition, conditionIndex) => {
        if (!healthCondition) {
          return;
        }

        if (!healthCondition.nombrePadecimiento?.trim()) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-nombrePadecimiento`
          ] = "El nombre del padecimiento es requerido.";
        }

        // Validación de tipoEvento
        if (!healthCondition.tipoEvento) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-tipoEvento`
          ] = "El tipo de evento es requerido.";
        }

        // Validación de fechaInicio
        if (!healthCondition.fechaInicio) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-fechaInicio`
          ] = "La fecha de inicio es requerida.";
        }

        // Validación de tipoTratamiento
        if (!healthCondition.tipoTratamiento) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-tipoTratamiento`
          ] = "El tipo de tratamiento es requerido.";
        }

        // Validación de detalleComplicacion si complicacion es "Sí"
        if (
          healthCondition.complicacion === "Sí" &&
          !healthCondition.detalleComplicacion?.trim()
        ) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-detalleComplicacion`
          ] = "Debe especificar la complicación.";
        }

        // Validación de detalleMedicamento si medicamento es "Sí"
        if (
          healthCondition.medicamento === "Sí" &&
          !healthCondition.detalleMedicamento?.trim()
        ) {
          newErrors[
            `question-${questionIndex}-condition-${conditionIndex}-detalleMedicamento`
          ] = "Debe especificar el medicamento.";
        }
      });
    });

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar los formularios antes de enviar
    setIsSubmitting(true);
    const validationErrors = validateHealthConditions();
    
    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, actualizar el estado de errores y no enviar el formulario
      setForms((prevForms) => [...prevForms]); // Trigger re-render
      return;
    }

    // Si no hay errores, se envía el formulario
    actionCreateMedicalHistory(forms);
  };

  return (
    <Card className="max-w-6xl mx-auto p-5">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-10">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleChildChange={handleChildChange}
              handleProtectedPersonChange={handleProtectedPersonChange}
            />

            <Separator />

            <ContactInfoSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />

            <Separator />

            <MedicalInformation
              forms={forms}
              setForms={setForms}
              questions={questions}
              formFamily={formData}
              errors={isSubmitting ? validateHealthConditions() : {}} // Aquí pasamos los errores
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded font-bold text-lg hover:bg-primary-dark mt-10"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
