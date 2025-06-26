"use client";

import Image from "next/image";
import { Shield, DollarSign, Percent, Heart, ArrowLeft, FileText, Download, Users } from "lucide-react";
import { ContractForm } from "../forms/confirm-form";
import { InfoCard } from "../cards/info-card";
import { deleteSelectedPlan } from "@/features/plans/actions/set-cookies";
import { FC, useState } from "react";
import { DeductibleAndCoInsuranceInfoModal } from "../modals/CombinedInfoModal";
import { formatCurrency } from "@/shared/utils";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";
import { Modal } from "@/shared/components/ui/modal";
import MoreInformationQuote from "../modals/MoreInformationModal";
import { generatePDFAction } from "../../actions/generate-pdf";
import { processPDFData } from "../../utils/process-pdf-data.util"
import { InsuranceQuoteData } from "../../types";
import { getProspect } from "@/features/plans/loaders/get-prospect";

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

    // Suma parents (array)
    if (Array.isArray(data.parents)) {
      data.parents.forEach((parent: MemberPrices) => {
        totalFirstMonth += parent.primerMes || 0;
        totalRemainingMonths += parent.segundoMesADoce || 0;
      });
    }

    // Suma others (array)
    if (Array.isArray(data.others)) {
      data.others.forEach((other: MemberPrices) => {
        totalFirstMonth += other.primerMes || 0;
        totalRemainingMonths += other.segundoMesADoce || 0;
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

export const QuoteSummary: FC<
  InsuranceQuoteData
> = (props) => {
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
    openModalMoreInformation,
    openModal,
  } = useQuoteSumaryActions();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  //! -------------------------------------------------------------------
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const prospectData = await getProspect();
      const pdfData = processPDFData({
        ...props,
        protectedWho: protectedWho
      }, prospectData);
      const result = await generatePDFAction(pdfData);

      if (result.success && result.data) {
        const link = document.createElement("a");
        link.href = result.data;
        link.download = `cotizacion-${props.company}-${props.plan}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Error generando PDF:", result.error);
      }
    } catch (error) {
      console.error("Error en la descarga:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  //! -------------------------------------------------------------------

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl lg:shadow-sm lg:border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="lg:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <form id="pdfIngnore" action={deleteSelectedPlan}>
                  <button className="text-gray-700 hover:text-gray-900 transition-colors">
                    <ArrowLeft strokeWidth={2.5} size={24} />
                  </button>
                </form>
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
                      <Download className="w-4 h-4" />
                      Descargar Cotización
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
          </div>
        </div>
      </div>

      {/* Modales */}
      {isOpen && (
        <>
          {modalType === "moreInformationQuote" && (
            <Modal
              title="Detalles de Prima"
              size="3xl"
              fullScreenOnMobile={true}
            >
              <MoreInformationQuote />
            </Modal>
          )}
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
    </div>
  );
};
