'use client';

import { Button } from '@tremor/react';
import { useGetQuoteForm } from '../hooks/use-get-quote-form';
import { PersonalInfoSection } from './personal-info-section';
import { ContactInfoSection } from './contact-info-section';
/* import { PersonalInfoSectionDynamic } from './dynamic-personal-info'; */

export const GetQuoteForm: React.FC = () => {
  const {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildAgeChange,
    handleProtectedAgeChange,
    handleSubmit,
  } = useGetQuoteForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6">
      <PersonalInfoSection
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleChildAgeChange={handleChildAgeChange}
        handleProtectedAgeChange={handleProtectedAgeChange}
      />
      {/* <PersonalInfoSectionDynamic 
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange as (field: string | number, value: string | number) => void}
      /> */}

      {showContactInfo && (
        <ContactInfoSection
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
        />
      )}

      <Button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg w-full mt-6 hover:bg-blue-600"
      >
        Cotizar
      </Button>
    </form>
  );
};