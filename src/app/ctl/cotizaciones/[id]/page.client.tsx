"use client"

import { useNotificationStore } from "@/features/notification/store/notification-store"
import { updateQuote } from "@/features/quote/actions/update-quote"
import { ContactInfoSection } from "@/features/quote/components/forms/contact-info-section"
import { PersonalInfoSection } from "@/features/quote/components/forms/personal-info-section"
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form"
import type { Quote } from "@/features/quote/types"
import { Card, CardContent } from "@/shared/components/ui/card"
import { SubmitButton } from "@/shared/components/ui/submit-button"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form"
import { QUESTIONS } from "@/features/quote/data"
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs"
import { prefix } from "@/features/layout/nav-config/constants"

export function QuotePageClient({ quote }: { quote: Quote }) {
  const { formData, errors, handleChildChange, handleInputChange, handleProtectedPersonChange, forms, setForms } =
    useGetQuoteForm(quote, QUESTIONS)

  const { showNotification } = useNotificationStore()

  const updateUserWithId = updateQuote.bind(null, quote.id)

  const [state, formAction] = useFormState(updateUserWithId, {
    message: "",
    success: false,
    inputErrors: {},
  })

  useEffect(() => {
    if (state.success) {
      showNotification(state.message, "success")
    }
  }, [state, showNotification])

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Breadcrumbs
          items={[
            { label: "Cotizaciones", href: `${prefix}/cotizaciones` },
            {
              label: "Detalle de cotización",
              href: `${prefix}/cotizaciones/${quote.id}`,
            },
          ]}
        />
      </div>

      <form action={formAction}>
        <input type="hidden" name="medicalData" value={JSON.stringify(forms)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="flex flex-col space-y-6">
            <div className="rounded-xl bg-muted/50 p-5">
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

            <div className="rounded-xl bg-muted/50 p-5">
              <Card>
                <CardContent>
                  <ContactInfoSection formData={formData} errors={errors} handleInputChange={handleInputChange} />
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50 p-5 hidden md:block">
              <SubmitButton
                label="Actualizar cotización"
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                labelPending="Actualizando..."
              />
            </div>
          </div>

          <div className="rounded-xl bg-muted/50 p-5">
            <Card>
              <CardContent>
                <MedicalInformationForm
                  forms={forms}
                  setForms={setForms}
                  questions={QUESTIONS}
                  formFamily={formData}
                  errors={errors}
                />
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl bg-muted/50 p-5 block md:hidden">
            <SubmitButton
              label="Actualizar cotización"
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
              labelPending="Actualizando..."
            />
          </div>

        </div>
      </form>
    </>
  )
}

