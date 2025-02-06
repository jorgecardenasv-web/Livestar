"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
import { Question } from "../../types";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ContactInfoSection } from "../sections/contact-info-section";
import { MedicalInformationForm } from "../forms/medical-information-form";
import { PersonalInfoSection } from "../sections/personal-info-section";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { QUESTIONS } from "../../data";

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
    handleSubmit,
    forms,
    setForms,
    currentMedicalErrors,
    isSubmitting,
  } = useGetQuoteForm(prospect, QUESTIONS);

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
              errors={currentMedicalErrors}
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