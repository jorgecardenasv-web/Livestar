"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
import { Question } from "../../types";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ContactInfoSection } from "../sections/contact-info-section";
import { MedicalInformationForm } from "../forms/medical-information-form";
import { PersonalInfoSection } from "../sections/personal-info-section";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useMedicalQuoteForm } from "../../hooks/use-medical-quote-form";

const QUESTIONS: Question[] = [
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

interface QuoteFinalizationClientPageProps {
  prospect: any;
}

export const QuoteFinalizationForm = ({ prospect }: QuoteFinalizationClientPageProps) => {
  const {
    formData,
    errors: formErrors,
    handleChildChange,
    handleInputChange,
    handleProtectedPersonChange,
  } = useGetQuoteForm(prospect);

  const {
    forms,
    setForms,
    isSubmitting,
    currentErrors,
    handleSubmit,
  } = useMedicalQuoteForm({
    questions: QUESTIONS,
    onSubmitSuccess: () => {
      console.log('Form submitted successfully');
    },
    onSubmitError: (error) => {
      console.error('Error submitting form:', error);
    }
  });

  return (
    <Card className="max-w-6xl mx-auto p-5">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-10">
            <PersonalInfoSection
              formData={formData}
              errors={formErrors}
              handleInputChange={handleInputChange}
              handleChildChange={handleChildChange}
              handleProtectedPersonChange={handleProtectedPersonChange}
            />

            <Separator />

            <ContactInfoSection
              formData={formData}
              errors={formErrors}
              handleInputChange={handleInputChange}
            />

            <Separator />

            <MedicalInformationForm
              forms={forms}
              setForms={setForms}
              questions={QUESTIONS}
              formFamily={formData}
              errors={currentErrors}
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton
              label="Enviar solicitud"
              labelPending="Enviando..."
              disabled={isSubmitting}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};