"use client";

import { useGetQuoteForm } from "../hooks/use-get-quote-form";
import { PersonalInfoSection } from "./personal-info-section";
import { ContactInfoSection } from "./contact-info-section";

export const GetQuoteForm: React.FC = () => {
  const {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    handleSubmit,
  } = useGetQuoteForm();

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

      <button
        type="submit"
        className="bg-primary text-white px-6 py-3 rounded font-bold text-lg w-full mt-6 hover:bg-[#223E99]"
      >
        Cotizar
      </button>
    </form>
  );
};
