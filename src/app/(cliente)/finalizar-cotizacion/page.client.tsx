"use client";
import { ContactInfoSection } from "@/features/insurance-quote/components/contact-info-section";
import { MedicalInformation } from "@/features/insurance-quote/components/medical-information";
import { PersonalInfoSection } from "@/features/insurance-quote/components/personal-info-section";
import { useGetQuoteForm } from "@/features/insurance-quote/hooks/use-get-quote-form";
import { Card, Divider } from "@tremor/react";
import { useState } from "react";
import { Question } from "@/features/insurance-quote/types";
import { actionCreateMedicalHistory } from "@/features/insurance-quote/actions/create-medical-history";

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

  //Inicializar el estado de los formularios
  const [forms, setForms] = useState(
    questions.map((question) => ({
      [`answer-${question.id}`]: "No",
      hospitalizado: "No",
      complicacion: "No",
      estadoSalud: "Sano",
      medicamento: "No",
    }))
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actionCreateMedicalHistory(forms);
    console.log("Datos del formulario:", forms);
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="space-y-10">
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleChildChange={handleChildChange}
            handleProtectedPersonChange={handleProtectedPersonChange}
          />

          <Divider />

          <ContactInfoSection
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />

          <Divider />

          <MedicalInformation
            forms={forms}
            setForms={setForms}
            questions={questions}
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
    </Card>
  );
}
