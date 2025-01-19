"use client";

import { useGetQuoteForm } from "../../hooks/use-get-quote-form";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { PersonalInfoSection } from "../sections/personal-info-section";
import { ContactInfoSection } from "../sections/contact-info-section";

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

      <SubmitButton
        type="submit"
        label="Cotizar"
        labelPending="Cotizando..."
        className="bg-primary text-white p-6 rounded font-bold text-lg w-full mt-6 hover:bg-[#223E99]"
      />
    </form>
  );
};
