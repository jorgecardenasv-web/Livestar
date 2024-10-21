"use client";

import { QuoteSummary } from "@/features/quote-summary/components/quote-summary";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getInsuranceState } from "@/features/insurance-plans/actions/insurance-actions";
import { notFound } from "next/navigation";
import { MedicalInformation } from "@/features/insurance-quote/components/medical-information";
import { PersonalInfoSection } from "@/features/insurance-quote/components/personal-info-section";
import { ContactInfoSection } from "@/features/insurance-quote/components/contact-info-section";
import { useGetQuoteForm } from "@/features/insurance-quote/hooks/use-get-quote-form";
import { Card, Divider } from "@tremor/react";

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
  return (
    <Card className="max-w-6xl mx-auto">
      <form>
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

          <MedicalInformation />
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
