"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { PersonalInfoSection } from "./personal-info-section";
import { ContactInfoSection } from "./contact-info-section";
import { Button } from "@/shared/components/ui/button";

export const GetQuoteForm: React.FC<{
  prospect: any;
}> = ({ prospect }) => {
  const {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    handleSubmit,
    isSubmitting
  } = useGetQuoteForm(prospect);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6">
      <PersonalInfoSection
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleChildChange={handleChildChange}
        handleProtectedPersonChange={handleProtectedPersonChange}
      />

      {showContactInfo && (
        <ContactInfoSection
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
        />
      )}

      <Button type="submit" disabled={isSubmitting} className="bg-primary text-white p-6 rounded font-bold text-lg w-full mt-6 hover:bg-[#223E99]">
        {
          isSubmitting ? "Cotizando..." : "Cotizar"
        }
      </Button>
    </form>
  );
};
