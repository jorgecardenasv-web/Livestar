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
import { NumberInput } from "@/shared/components/ui/number-input"
import { DollarSign, Percent } from "lucide-react"
import { TextInput } from "@/shared/components/ui/text-input"

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
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl" />

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Datos del plan cotizado
                    </h3>
                  </div>
                  <TextInput
                    name="planType"
                    label="Nombre del Plan"
                    defaultValue={quote?.plan?.planType?.name}
                    disabled
                  />

                  <TextInput
                    name="companyId"
                    label="Compañía"
                    defaultValue={quote?.plan?.company.name}
                    disabled
                  />

                  <NumberInput
                    name="sumInsured"
                    label="Suma Asegurada"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder="Ingrese suma asegurada"
                    defaultValue={quote?.plan?.sumInsured}
                    disabled
                  />

                  <NumberInput
                    name="coInsurance"
                    label="Coaseguro"
                    icon={<Percent className="w-4 h-4 text-gray-500" />}
                    step="1"
                    min="0"
                    max="100"
                    defaultValue={quote?.plan?.coInsurance}
                    placeholder="Ej: 20%"
                    disabled
                  />

                  <NumberInput
                    name="coInsuranceCap"
                    label="Tope de Coaseguro"
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    placeholder="Ingrese tope de coaseguro"
                    defaultValue={quote?.plan?.coInsuranceCap!}
                    disabled
                  />
                </CardContent>
              </Card>
            </div>

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

