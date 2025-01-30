"use client";

import { updateProspect } from "@/features/prospects/actions/update-prospect";
import { ContactInfoSection } from "@/features/quote/components/sections/contact-info-section";
import { PersonalInfoSection } from "@/features/quote/components/sections/personal-info-section";
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SubmitButton } from "@/shared/components/ui/submit-button";

export function ProspectClientPage({ prospect }: { prospect: any }) {
  const {
    formData,
    errors,
    handleChildChange,
    handleInputChange,
    handleProtectedPersonChange,
  } = useGetQuoteForm(prospect);

  const updateUserWithId = updateProspect.bind(null, prospect.id);

  return (
    <form action={updateUserWithId}>
      <div className="space-y-10">
        <Card className="bg-white dark:bg-zinc-800">
          <CardContent>
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleChildChange={handleChildChange}
              handleProtectedPersonChange={handleProtectedPersonChange}
            />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-800">
          <CardContent>
            <ContactInfoSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end mt-6">
        <SubmitButton
          label="Guardar"
          className="h-14 text-xl"
          labelPending="Guardando..."
        />
      </div>
    </form>
  );
}
