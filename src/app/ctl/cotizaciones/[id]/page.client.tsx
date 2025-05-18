"use client"

import { useNotificationStore } from "@/features/notification/store/notification-store"
import { updateQuote } from "@/features/quote/actions/update-quote"
import { ContactInfoSection } from "@/features/quote/components/forms/contact-info-section"
import { PersonalInfoSection } from "@/features/quote/components/forms/personal-info-section"
import { useGetQuoteForm } from "@/features/quote/hooks/use-get-quote-form"
import type { AdditionalInfo, DeductiblesData, Quote, CoInsuranceData, CoInsuranceCapData } from "@/features/quote/types"
import { Card, CardContent } from "@/shared/components/ui/card"
import { SubmitButton } from "@/shared/components/ui/submit-button"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form"
import { QUESTIONS } from "@/features/quote/data"
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs"
import { prefix } from "@/features/layout/nav-config/constants"
import { MembersTable } from "@/features/quote/components/tables/members-table"
import { formatCurrency, formatPercentage } from "@/shared/utils"
import { DeductiblesAccordion } from "@/features/quote/components/accodions/deductibles-accordion"
import { CoInsuranceAccordion } from "@/features/quote/components/accodions/co-insurance-accordion"

export function QuotePageClient({ quote }: { quote: Quote }) {
  const { formData, errors, handleChildChange, handleInputChange, handleProtectedPersonChange, forms, setForms } =
    useGetQuoteForm(quote, QUESTIONS)

  const { showNotification } = useNotificationStore()

  // Asegurarnos de que quote no sea nulo antes de acceder a sus propiedades
  const updateUserWithId = quote?.id ? updateQuote.bind(null, quote.id) : null

  const [state, formAction] = useFormState(
    updateUserWithId || (() => ({ message: "Error: No se pudo encontrar la cotización", success: false, inputErrors: {} })),
    {
      message: "",
      success: false,
      inputErrors: {},
    }
  )

  useEffect(() => {
    if (state.success) {
      showNotification(state.message, "success")
    }
  }, [state, showNotification])

  const processMembers = (membersData: any) => {
    if (!membersData) return [];

    const members = [];

    // Verificar si tenemos formato con precios diferenciados (primerMes y segundoMesADoce)
    // Este formato puede estar presente en HDI u otras aseguradoras que usen precios iniciales diferentes
    const hasDifferentiatedPrices = membersData && typeof membersData === 'object' &&
      (membersData.main && typeof membersData.main === 'object' && membersData.main.primerMes !== undefined ||
        membersData.partner && typeof membersData.partner === 'object' && membersData.partner.primerMes !== undefined ||
        (membersData.children && membersData.children[0] &&
          typeof membersData.children[0] === 'object' && membersData.children[0].primerMes !== undefined));

    // Función auxiliar para procesar cada miembro con formato consistente
    const processMember = (member: any, type: string, id: string, name?: string) => {
      if (hasDifferentiatedPrices && typeof member === 'object' && member.primerMes !== undefined) {
        return {
          id,
          type,
          name,
          price: member.price || member.anual || 0,
          primerMes: member.primerMes,
          segundoMesADoce: member.segundoMesADoce
        };
      } else if (typeof member === 'object' && member.price !== undefined) {
        return {
          id,
          type,
          name,
          price: member.price
        };
      } else {
        return {
          id,
          type,
          name,
          price: member
        };
      }
    };

    // Procesar titular
    if (membersData.main) {
      members.push(processMember(membersData.main, 'Titular', 'main'));
    }

    // Procesar pareja
    if (membersData.partner) {
      members.push(processMember(membersData.partner, 'Pareja', 'partner'));
    }

    // Procesar hijos
    if (membersData.children) {
      membersData.children.forEach((child: any, index: number) => {
        members.push(processMember(child, `Hijo/a ${index + 1}`, `child-${index}`));
      });
    }

    // Procesar padres
    if (membersData.parents) {
      membersData.parents.forEach((parent: any, index: number) => {
        members.push(processMember(parent, 'Padre/Madre', `parent-${index}`, parent.name));
      });
    }

    return members;
  };

  // Función para obtener el texto del deducible
  const getDeductibleText = (quote: Quote | null) => {
    if (!quote) return '';

    if (quote.isMultipleDeductible) {
      return "Múltiples opciones";
    } else {
      return formatCurrency(quote.deductible);
    }
  };

  // Función para obtener el texto del coaseguro
  const getCoInsuranceText = (quote: Quote | null) => {
    if (!quote) return '';

    if (quote.isMultipleCoInsurance) {
      return "Múltiples opciones";
    } else {
      return formatPercentage(quote.coInsurance);
    }
  };

  // Función para obtener el texto del tope de coaseguro
  const getCoInsuranceCapText = (quote: Quote | null) => {
    if (!quote) return '';

    if (quote.isMultipleCoInsurance) {
      return "Múltiples opciones";
    } else {
      return formatCurrency(quote.coInsuranceCap);
    }
  };

  // Procesar los miembros desde la data real
  const members = processMembers(quote?.membersData);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
        <Breadcrumbs
          items={[
            { label: "Cotizaciones", href: `${prefix}/cotizaciones` },
            {
              label: "Detalle de cotización",
              href: `${prefix}/cotizaciones/${quote?.id}`,
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
                        {quote?.planData?.planTypeName || "Plan no disponible"}
                      </h3>
                      <p className="text-muted-foreground">
                        {quote?.planData?.companyName || "Compañía no disponible"}
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
                      {quote?.isMultipleDeductible && quote?.deductiblesData && (
                        <div className="pt-2">
                          <DeductiblesAccordion
                            deductiblesData={quote.deductiblesData as DeductiblesData}
                            additionalInfo={{ ...quote.additionalInfo as AdditionalInfo, age: Number(formData.age) }}
                            protectWho={quote.protectWho}
                            mainAge={Number(formData.age) || quote?.prospect?.age || 0}
                          />
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Coaseguro:</dt>
                        <dd className="font-medium">{getCoInsuranceText(quote)}</dd>
                      </div>
                      {quote?.isMultipleCoInsurance && quote?.coInsuranceData && (
                        <div className="pt-2">
                          <CoInsuranceAccordion
                            coInsuranceData={quote.coInsuranceData as CoInsuranceData}
                            coInsuranceCapData={quote.coInsuranceCapData as CoInsuranceCapData}
                            additionalInfo={{ ...quote.additionalInfo as AdditionalInfo, age: Number(formData.age) }}
                            protectWho={quote.protectWho}
                            mainAge={Number(formData.age) || quote?.prospect?.age || 0}
                          />
                        </div>
                      )}
                      {/* Solo mostrar el tope de coaseguro como línea separada cuando no es múltiple */}
                      {!quote?.isMultipleCoInsurance && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Tope de Coaseguro:</dt>
                          <dd className="font-medium">{formatCurrency(quote?.coInsuranceCap || 0)}</dd>
                        </div>
                      )}
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
                    {members.some(m => m.primerMes !== undefined && m.segundoMesADoce !== undefined) ? (
                      <>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Pago Inicial (Mes 1):</span>
                            <span className="font-bold text-primary">
                              {formatCurrency(members.reduce((sum, m) => sum + (m.primerMes || 0), 0))}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Pago Mensual (Meses 2-12):</span>
                            <span className="font-bold text-primary">
                              {formatCurrency(members.reduce((sum, m) => sum + (m.segundoMesADoce || 0), 0))}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-border pt-2">
                          <span className="text-muted-foreground">Prima Total Anual:</span>
                          <span className="text-2xl font-bold text-primary">
                            {formatCurrency(quote?.coverageFee)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Recurrencia de Pago: {quote?.paymentType}
                        </p>
                        <div className="bg-muted/30 rounded-md p-2 mt-2 text-xs">
                          <p className="text-muted-foreground font-medium">
                            * Esta cotización muestra precios diferenciados
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Prima Total:</span>
                          <span className="text-2xl font-bold text-primary">
                            {formatCurrency(quote?.coverageFee)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Recurrencia de Pago: {quote?.paymentType}
                        </p>
                      </>
                    )}
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
