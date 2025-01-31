"use client";

import { useNotificationStore } from "@/features/notification/store/notification-store";
import { updateProspect } from "@/features/prospects/actions/update-prospect";
import { ContactInfoSection } from "@/features/quote/components/sections/contact-info-section";
import { PersonalInfoSection } from "@/features/quote/components/sections/personal-info-section";
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function ProspectClientPage({ prospect }: { prospect: any }) {
  const {
    formData,
    errors,
    handleChildChange,
    handleInputChange,
    handleProtectedPersonChange,
  } = useGetQuoteForm(prospect);

  const { showNotification } = useNotificationStore();

  const updateUserWithId = updateProspect.bind(null, prospect.id);

  const [state, formAction] = useFormState(updateUserWithId, {
    message: "",
    success: false,
    inputErrors: {},
  });

  useEffect(() => {
    if (state.success) {
      showNotification(
        state.message,
        "success"
      );
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="space-y-10">
        <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
          <Card>
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
        </div>

        <div className="flex-1 rounded-xl bg-muted/50 p-5 space-y-6">
          <Card>
            <CardContent>
              <ContactInfoSection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            </CardContent>
          </Card>
        </div>
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
