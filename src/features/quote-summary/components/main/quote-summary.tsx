"use client";

import Image from "next/image";
import { Shield, DollarSign, Percent, Heart, ArrowLeft, FileText, Download, Users, Loader2 } from "lucide-react";
import { ContractForm } from "../forms/confirm-form";
import { InfoCard } from "../cards/info-card";
import { deleteSelectedPlan } from "@/features/plans/actions/set-cookies";
import { FC, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { DeductibleAndCoInsuranceInfoModal } from "../modals/CombinedInfoModal";

// Función para convertir data URI a Blob
const dataURItoBlob = (dataURI: string): Blob => {
  try {
    // Verificar que sea un data URI válido
    if (!dataURI.startsWith('data:')) {
      console.error('Invalid data URI format');
      return new Blob([], { type: 'application/pdf' });
    }

    // Extraer la parte base64 y el tipo MIME
    const parts = dataURI.split(',');
    if (parts.length !== 2) {
      console.error('Invalid data URI format: missing comma separator');
      return new Blob([], { type: 'application/pdf' });
    }

    const mimeMatch = parts[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
      console.error('Invalid data URI format: cannot extract MIME type');
      return new Blob([], { type: 'application/pdf' });
    }

    const mimeString = mimeMatch[1];
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  } catch (error) {
    console.error('Error converting data URI to Blob:', error);
    return new Blob([], { type: 'application/pdf' });
  }
};
import { formatCurrency } from "@/shared/utils";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";
import { Modal } from "@/shared/components/ui/modal";
import MoreInformationQuote from "../modals/MoreInformationModal";
import { generatePDFAction } from "../../actions/generate-pdf";
import { processPDFData } from "../../utils/process-pdf-data.util"
import { InsuranceQuoteData } from "../../types";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { getProspectByQuoteId } from "../../actions/get-prospect-by-quote";
import { useQuoteRuntimeStore } from "@/shared/store/quote-runtime-store";
import { MedicalInformationForm } from "@/features/quote/components/forms/medical-information-form";
import { QUESTIONS } from "@/features/quote/data";
import { updateQuoteFromSummary } from "@/features/quote-summary/actions/update-quote-from-summary";
import { Button } from "@/shared/components/ui/button";
import { normalizeFormData } from "@/features/quote/utils/normalize-form-data";

interface MemberPrices {
  primerMes?: number;
  segundoMesADoce?: number;
}

const getIndividualPrices = (jsonString: string | undefined): { firstMonth: number, remainingMonths: number } => {
  if (!jsonString) return { firstMonth: 0, remainingMonths: 0 };
  try {
    const data = JSON.parse(jsonString);
    let totalFirstMonth = 0;
    let totalRemainingMonths = 0;

    // Suma main
    if (data.main) {
      totalFirstMonth += data.main.primerMes || 0;
      totalRemainingMonths += data.main.segundoMesADoce || 0;
    }

    // Suma partner
    if (data.partner) {
      totalFirstMonth += data.partner.primerMes || 0;
      totalRemainingMonths += data.partner.segundoMesADoce || 0;
    }

    // Suma children (array)
    if (Array.isArray(data.children)) {
      data.children.forEach((child: MemberPrices) => {
        totalFirstMonth += child.primerMes || 0;
        totalRemainingMonths += child.segundoMesADoce || 0;
      });
    }

    // Suma parents (array) - Handle nested price structure
    if (Array.isArray(data.parents)) {
      data.parents.forEach((parent: any) => {
        // Handle nested price structure: { name: "Padre", price: { primerMes: X, segundoMesADoce: Y } }
        const primerMes = parent?.price?.primerMes ?? parent?.primerMes ?? 0;
        const segundoMesADoce = parent?.price?.segundoMesADoce ?? parent?.segundoMesADoce ?? 0;
        totalFirstMonth += primerMes;
        totalRemainingMonths += segundoMesADoce;
      });
    }

    // Suma others (array) - Handle nested price structure
    if (Array.isArray(data.others)) {
      data.others.forEach((other: any) => {
        // Handle nested price structure: { relationship: "...", price: { primerMes: X, segundoMesADoce: Y } }
        const primerMes = other?.price?.primerMes ?? other?.primerMes ?? 0;
        const segundoMesADoce = other?.price?.segundoMesADoce ?? other?.segundoMesADoce ?? 0;
        totalFirstMonth += primerMes;
        totalRemainingMonths += segundoMesADoce;
      });
    }

    return {
      firstMonth: totalFirstMonth,
      remainingMonths: totalRemainingMonths
    };
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return { firstMonth: 0, remainingMonths: 0 };
  }
};

const getMinimumValues = (jsonString: string | undefined): number => {
  if (!jsonString) return 0;
  try {
    const data = JSON.parse(jsonString);

    // Si el JSON tiene el formato simple { value: number }
    if (data.value !== undefined) {
      return typeof data.value === 'number' ? data.value : 0;
    }

    // Para el formato complejo con múltiples opciones
    let minValue = Infinity;
    Object.keys(data).forEach(option => {
      Object.values(data[option]).forEach((value: any) => {
        if (typeof value === 'number' && value < minValue) {
          minValue = value;
        }
      });
    });

    return minValue === Infinity ? 0 : minValue;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return 0;
  }
};

const SubmitMedicalButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="mt-4"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Actualizando...
        </>
      ) : (
        "Quiero contratar"
      )}
    </Button>
  );
};

export const QuoteSummary: FC<
  InsuranceQuoteData
> = (props) => {
  const quoteIdParam = useQuoteRuntimeStore((s) => s.quoteId) ?? "";
  const {
    coInsurance,
    coInsuranceCap,
    coverage_fee,
    individualPricesJson,
    deductible,
    sumInsured,
    company,
    imgCompanyLogo,
    plan,
    paymentType,
    isMultipleString,
    deductiblesJson,
    isMultipleCoInsurance,
    coInsuranceJson,
    coInsuranceCapJson,
    protectedWho,
  } = props;
  const isMultiple = isMultipleString === "true" ? true : false;
  const isMultipleCoIns = isMultipleCoInsurance === "true" ? true : false;
  const {
    isOpen,
    modalType,
    modalProps,
    openModalMoreInformation,
    openModal,
  } = useQuoteSumaryActions();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Detectar si es un dispositivo iOS con una detección más robusta
  const isIOS = typeof navigator !== 'undefined' ?
    (/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) :
    false;

  // Estado para controlar mensajes de error
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfSuccess, setPdfSuccess] = useState<string | null>(null);
  const [forms, setForms] = useState<any[]>(() =>
    QUESTIONS.map(() => ({
      healthConditions: [],
      activePadecimiento: null,
    }))
  );
  const [medicalErrors, setMedicalErrors] = useState<Record<string, string>>({});
  const [medicalSuccess, setMedicalSuccess] = useState<string | null>(null);
  const [formFamily, setFormFamily] = useState<any>({ protectWho: protectedWho });

  useEffect(() => {
    (async () => {
      try {
        let prospectData = await getProspect();
        
        // Si tenemos un quoteId, priorizamos los datos de la BD para asegurar consistencia
        if (quoteIdParam) {
          const dbData = await getProspectByQuoteId(quoteIdParam);
          if (dbData) {
            prospectData = {
              ...prospectData,
              ...dbData,
              // Asegurar que additionalInfo se combine correctamente si dbData lo trae
              additionalInfo: dbData.additionalInfo || prospectData.additionalInfo
            };
          }
        }

        // Usar normalizeFormData para estandarizar la estructura de datos
        // tal como se hace en el hook useGetQuoteForm en CTL
        const normalizedData = normalizeFormData({
          ...prospectData,
          protectWho: prospectData.protectWho ?? protectedWho
        });
        
        setFormFamily(normalizedData);

        // Si hay historial médico, restaurar el estado del formulario
        const medicalHistories = (prospectData as any).medicalHistories || [];
        if (medicalHistories && Array.isArray(medicalHistories) && medicalHistories.length > 0) {
          const newForms = QUESTIONS.map((q, idx) => {
            const history = medicalHistories.find((h: any) => h.questionId === (q.id ?? idx));
            if (history) {
              return {
                [`answer-${idx}`]: history.answer,
                healthConditions: history.healthConditions || [],
                activePadecimiento: history.activePadecimiento,
              };
            }
            return {
              healthConditions: [],
              activePadecimiento: null,
            };
          });
          setForms(newForms);
        }
      } catch (error) {
        console.error("Error loading prospect data:", error);
      }
    })();
  }, [protectedWho, quoteIdParam]);

  //! -------------------------------------------------------------------
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    setPdfError(null);

    try {
      // Intentar obtener prospecto desde cookie; si no hay, usar quoteId en memoria
      let prospectData = await getProspect();
      const quoteIdStore = useQuoteRuntimeStore.getState().quoteId;
      const hasEmail = Boolean(prospectData?.prospect?.email);
      if (!hasEmail && quoteIdStore) {
        prospectData = await getProspectByQuoteId(quoteIdStore);
      }
      const pdfData = processPDFData({
        ...props,
        protectedWho: protectedWho
      }, prospectData);
      const result = await generatePDFAction(pdfData, {
        name: prospectData?.prospect?.name,
        email: prospectData?.prospect?.email,
      });

      if (result.success && result.data) {
        if (isIOS) {
          setPdfSuccess("Se ha enviado la cotización a tu correo electrónico.");
        } else {
          const pdfBlob = dataURItoBlob(result.data);
          const blobUrl = URL.createObjectURL(pdfBlob);
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.setAttribute('download', `cotizacion-${props.company}-${props.plan}.pdf`);
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
          }, 100);
          setPdfSuccess("Se ha descargado la cotización y enviado a tu correo electrónico.");
        }
      } else {
        console.error("Error generando PDF:", result.error);
        setPdfError("No se pudo generar la cotización. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error en la descarga:", error);
      setPdfError("Ocurrió un error al procesar la cotización. Por favor, intente nuevamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl lg:shadow-sm lg:border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="lg:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Resumen de cotización
                </h2>
              </div>
              <Image
                src={imgCompanyLogo}
                width={80}
                height={60}
                className="h-12 w-auto object-contain"
                alt={`Logo de ${company}`}
                priority
              />
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="p-6 space-y-8">
            {/* Información de Precios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="text-center sm:text-left">
                {!isMultipleCoIns && individualPricesJson && paymentType === "Mensual" ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-sky-600 font-semibold uppercase">
                        Primer mes
                      </p>
                      <p className="text-4xl font-bold text-[#223E99]">
                        {formatCurrency(getIndividualPrices(individualPricesJson).firstMonth)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-sky-600 font-semibold">
                        Del mes 2 al 12
                      </p>
                      <p className="text-xl font-semibold text-[#223E99]">
                        {formatCurrency(getIndividualPrices(individualPricesJson).remainingMonths)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-sky-600 font-semibold uppercase">
                      Total {paymentType === "Anual" ? "Anual" : ""}
                    </p>
                    <p className="text-4xl font-bold text-[#223E99]">
                      {formatCurrency(coverage_fee)}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-sky-600 font-semibold uppercase">
                  Plan
                </p>
                <p className="text-xl font-bold text-[#223E99]">
                  {plan}
                </p>
              </div>
            </div>

            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Shield className="w-5 h-5" />}
                title="Suma asegurada"
                value={formatCurrency(sumInsured)}
              />
              <InfoCard
                icon={<DollarSign className="w-5 h-5" />}
                title="Deducible"
                value={isMultiple ? `desde ${formatCurrency(deductible)}` : formatCurrency(deductible)}
                useHtml={isMultiple}
                htmlElement={<div className="pl-8"></div>}
              />
              <InfoCard
                icon={<Percent className="w-5 h-5" />}
                title="Coaseguro"
                value={isMultipleCoIns
                  ? `desde ${getMinimumValues(coInsuranceJson)}%`
                  : `${coInsurance}%`}
                useHtml={isMultipleCoIns}
                htmlElement={<div className="pl-8"></div>}
              />
              <InfoCard
                icon={<Heart className="w-5 h-5" />}
                title="Tope coaseguro"
                value={isMultipleCoIns
                  ? `desde ${formatCurrency(getMinimumValues(coInsuranceCapJson))}`
                  : formatCurrency(coInsuranceCap)}
                useHtml={isMultipleCoIns}
                htmlElement={<div className="pl-8"></div>}
              />
            </div>

            {/* Botones de Acción */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  className={`w-full sm:w-auto font-medium flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${isGeneratingPDF
                    ? 'bg-sky-50 text-sky-400 cursor-not-allowed'
                    : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                    }`}
                  onClick={handleGeneratePDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-sky-600"></span>
                      Generando PDF...
                    </>
                  ) : (
                    <>
                      {isIOS ? (
                        <>
                          <FileText className="w-4 h-4" />
                          Ver Cotización
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Descargar Cotización
                        </>
                      )}
                    </>
                  )}
                </button>

                {(isMultiple || isMultipleCoIns) && (
                  <button
                    className="w-full sm:w-auto bg-sky-50 text-sky-600 hover:bg-sky-100 font-medium flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-colors"
                    onClick={() => openModal("combinedInfo", {
                      deductibles: deductiblesJson,
                      coInsurance: coInsuranceJson,
                      coInsuranceCap: coInsuranceCapJson
                    })}
                  >
                    <FileText className="w-4 h-4" />
                    Ver Deducibles y Coaseguros
                  </button>
                )}

                {protectedWho !== "solo_yo" && (
                  <button
                    className="w-full sm:w-auto bg-sky-50 text-sky-600 hover:bg-sky-100 font-medium flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-colors"
                    onClick={() => {
                      const pricesData = JSON.parse(individualPricesJson!);
                      openModalMoreInformation({
                        ...pricesData,
                        protectWho: protectedWho
                      });
                    }}
                  >
                    <Users className="w-4 h-4" />
                    Ver Desglose de mensualidad
                  </button>
                )}
              </div>
            </div>

            {/* Formulario de Contrato */}
            <div id="pdfIngnore" className="mt-6">
              <ContractForm />
            </div>

            {/* Formulario médico opcional al final */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <MedicalInformationForm
                forms={forms}
                setForms={setForms}
                questions={QUESTIONS as any}
                formFamily={formFamily}
                errors={medicalErrors}
                useCheckboxes
              />

              <form
                action={async (fd: FormData) => {
                  setMedicalSuccess(null);
                  setMedicalErrors({});
                  const medicalData = forms.map((form, idx) => {
                    const answerKey = `answer-${idx}`;
                    return {
                      answer: form[answerKey],
                      [answerKey]: form[answerKey],
                      questionId: QUESTIONS[idx]?.id ?? idx,
                      healthConditions: form.healthConditions || [],
                      activePadecimiento: form.activePadecimiento,
                    };
                  });
                  const allEmpty = medicalData.every(
                    (item) =>
                      !item.answer &&
                      (!item.healthConditions ||
                        item.healthConditions.length === 0)
                  );
                  const payload = allEmpty ? [] : medicalData;
                  fd.set("medicalData", JSON.stringify(payload));
                  if (quoteIdParam) {
                    fd.set("quoteId", quoteIdParam);
                  }
                  const res = await updateQuoteFromSummary(undefined, fd);
                  if (!res?.success) {
                    setMedicalErrors((prev) => ({ ...prev, global: res?.message || "No se pudo actualizar la cotización." }));
                    setMedicalSuccess(null);
                  } else {
                    setMedicalErrors({});
                  }
                }}
              >
                {/* Pasar quoteId por formulario a la Server Action */}
                <input type="hidden" name="quoteId" value={quoteIdParam} />
                <div className="flex flex-col items-end">
                  <SubmitMedicalButton />
                  {medicalSuccess && (
                    <p className="mt-2 text-sm text-green-600">{medicalSuccess}</p>
                  )}
                  {medicalErrors.global && (
                    <p className="mt-2 text-sm text-red-600">{medicalErrors.global}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {isOpen && (
        <>
          {modalType === "moreInformationQuote" && (() => {
            // Calcular el número total de miembros para el título dinámico
            let totalMembers = 0;
            if (modalProps.main) totalMembers++;
            if (modalProps.partner) totalMembers++;
            if (modalProps.children) totalMembers += modalProps.children.length;
            if (modalProps.parents) totalMembers += modalProps.parents.length;
            if (modalProps.others) totalMembers += modalProps.others.length;

            const modalTitle = totalMembers > 1 ? 'Detalles de los Asegurados' : 'Detalle del Asegurado';

            return (
              <Modal
                title={modalTitle}
                size="3xl"
                fullScreenOnMobile={true}
              >
                <MoreInformationQuote />
              </Modal>
            );
          })()}
          {modalType === "combinedInfo" && (
            <Modal
              title="Deducibles y Coaseguro"
              size="3xl"
              fullScreenOnMobile={true}
            >
              <DeductibleAndCoInsuranceInfoModal />
            </Modal>
          )}
        </>
      )}


      {/* Mensaje de error global */}
      {pdfError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
            <p className="mb-4">{pdfError}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPdfError(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setPdfError(null);
                  handleGeneratePDF();
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      )}

      {pdfSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Éxito</h3>
            <p className="mb-4">{pdfSuccess}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setPdfSuccess(null)}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
