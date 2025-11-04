"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ContactInfoSection } from "./contact-info-section";
import { MedicalInformationForm } from "../forms/medical-information-form";
import { PersonalInfoSection } from "./personal-info-section";
import { QUESTIONS } from "../../data";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

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
      </CardContent>
    </Card>
  );
};