"use client"

import { useNotificationStore } from "@/features/notification/store/notification-store"
import { updateQuote } from "@/features/quote/actions/update-quote"
import { ContactInfoSection } from "@/features/quote/components/forms/contact-info-section"
import { PersonalInfoSection } from "@/features/quote/components/forms/personal-info-section"
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form"
import type { AdditionalInfo, DeductiblesData, Quote } from "@/features/quote/types"
import { Card, CardContent } from "@/shared/components/ui/card"
import { SubmitButton } from "@/shared/components/ui/submit-button"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form"
import { QUESTIONS } from "@/features/quote/data"
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs"
import { prefix } from "@/features/layout/nav-config/constants"
import { MembersTable } from "@/features/quote/components/tables/members-table"
import { formatCurrency } from "@/shared/utils"
import { DeductiblesAccordion } from "@/features/quote/components/accodions/deductibles-accordion"

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

  const processMembers = (membersData: any) => {
    if (!membersData) return [];

    const members = [];
    if (membersData.main) {
      members.push({
        id: 'main',
        type: 'Titular',
        price: membersData.main
      });
    }
    if (membersData.partner) {
      members.push({
        id: 'partner',
        type: 'Pareja',
        price: membersData.partner
      });
    }
    if (membersData.children) {
      membersData.children.forEach((price: number, index: number) => {
        members.push({
          id: `child-${index}`,
          type: `Hijo/a ${index + 1}`,
          price: price
        });
      });
    }
    if (membersData.parents) {
      membersData.parents.forEach((parent: { name: string, price: number }, index: number) => {
        members.push({
          id: `parent-${index}`,
          type: 'Padre/Madre',
          name: parent.name,
          price: parent.price
        });
      });
    }
    return members;
  };

  const getDeductibleText = (quote: Quote) => {
    if (quote.isMultipleDeductible && quote.deductiblesData) {
      return `desde ${formatCurrency(quote.deductible)}`;
    }
    return formatCurrency(quote.deductible);
  };

  // Procesar los miembros desde la data real
  const members = processMembers(quote.membersData);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna Principal (8 columnas) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {/* Sección de Información Personal */}
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

            {/* Sección de Información de Contacto */}
            <div className="rounded-xl bg-muted/50 p-5">
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

            {/* Sección de Información Médica */}
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
          </div>

          {/* Columna Lateral - Resumen del Plan (4 columnas) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Plan information */}
            <div className="rounded-xl bg-muted/50 p-5 sticky top-6">
              <Card>
                <CardContent className="space-y-6 p-6">
                  {/* Encabezado del Plan */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">
                        {quote?.plan?.planType?.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {quote?.plan?.company.name}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      Coberturas Principales
                    </h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Suma Asegurada:</dt>
                        <dd className="font-medium">{formatCurrency(quote?.sumInsured)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Deducible:</dt>
                        <dd className="font-medium">{getDeductibleText(quote)}</dd>
                      </div>
                      {quote.isMultipleDeductible && quote.deductiblesData && (
                        <div className="pt-2">
                          <DeductiblesAccordion
                            deductiblesData={quote.deductiblesData as DeductiblesData}
                            additionalInfo={quote.additionalInfo as AdditionalInfo}
                            protectWho={quote.protectWho}
                            mainAge={quote?.prospect?.age ?? null}
                          />
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Coaseguro:</dt>
                        <dd className="font-medium">{quote.coInsurance}%</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Tope de Coaseguro:</dt>
                        <dd className="font-medium">{formatCurrency(quote.coInsuranceCap)}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Desglose de Asegurados */}
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      Desglose de Asegurados
                    </h4>
                    <div className="bg-card rounded-lg border">
                      <MembersTable data={members} />
                    </div>
                  </div>

                  {/* Prima Total */}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prima Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(quote?.coverageFee)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Recurrencia de Pago: {quote?.paymentType}
                    </p>
                  </div>

                  {/* Botón de Actualizar */}
                  <SubmitButton
                    label="Actualizar cotización"
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-4"
                    labelPending="Actualizando..."
                  />
                </CardContent>
              </Card>
            </div>
          </div >
        </div >
      </form >
    </>
  )
}

