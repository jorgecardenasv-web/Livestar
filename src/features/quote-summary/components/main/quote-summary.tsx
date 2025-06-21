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

  console.log("QuoteSummary props:", props);


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
    <div
      id="quote-summary"
      className="max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl lg:shadow-lg lg:border m-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <form id="pdfIngnore" action={deleteSelectedPlan}>
            <button className="text-tremor-content-emphasis mt-2">
              <ArrowLeft strokeWidth={3} size={30} />
            </button>
          </form>
          <h2 className="text-xl sm:text-2xl font-bold text-tremor-content-emphasis">
            Resumen de cotización
          </h2>
        </div>
        <Image
          src={imgCompanyLogo}
          width={80}
          height={60}
          className="h-12 w-auto object-contain"
          alt={`Logo de ${company}`}
        />
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-center sm:text-left">
            {!isMultipleCoIns && individualPricesJson && paymentType === "Mensual" ? (
              <div className="space-y-1">
                <div>
                  <p className="text-xs sm:text-sm text-sky-600 font-semibold uppercase">
                    Primer mes
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-[#223E99]">
                    {formatCurrency(getIndividualPrices(individualPricesJson).firstMonth)}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-sky-600 font-semibold">
                    Del mes 2 al 12
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-[#223E99]">
                    {formatCurrency(getIndividualPrices(individualPricesJson).remainingMonths)}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs sm:text-sm text-sky-600 font-semibold uppercase">
                  Total {paymentType === "Anual" ? "Anual" : ""}
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-[#223E99]">
                  {formatCurrency(coverage_fee)}
                </p>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs sm:text-sm text-sky-600 font-semibold uppercase">
              Plan
            </p>
            <p className="text-lg sm:text-xl font-bold text-[#223E99]">
              {plan}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InfoCard
          icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Suma asegurada"
          value={formatCurrency(sumInsured)}
        />
        <div className="flex justify-between">
          <InfoCard
            icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Deducible"
            value={`${isMultiple ? `desde ${formatCurrency(deductible)}` : `${formatCurrency(deductible)}`}`}
            useHtml={isMultiple}
            htmlElement={<div className="pl-8"></div>}
          />
        </div>
        <div className="flex justify-between">
          <InfoCard
            icon={<Percent className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Coaseguro"
            value={`${isMultipleCoIns
              ? `desde ${getMinimumValues(coInsuranceJson)}%`
              : `${coInsurance}%`}`}
            useHtml={isMultipleCoIns}
            htmlElement={<div className="pl-8"></div>}
          />
        </div>
        <div className="flex justify-between">
          <InfoCard
            icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Tope coaseguro"
            value={`${isMultipleCoIns
              ? `desde ${formatCurrency(getMinimumValues(coInsuranceCapJson))}`
              : formatCurrency(coInsuranceCap)}`}
            useHtml={isMultipleCoIns}
            htmlElement={<div className="pl-8"></div>}
          />
        </div>
      </div>
      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {/* Botón de descarga de PDF siempre visible */}
          <button
            className={`font-medium flex items-center gap-1.5 px-3 py-1.5 transition-colors ${isGeneratingPDF
              ? 'text-sky-400 cursor-not-allowed'
              : 'text-sky-600 hover:text-sky-800'}`}
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-sky-600 mr-1"></span>
                Generando PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Descargar Cotización
              </>
            )}
          </button>

          {/* Separador vertical si hay botón de deducibles */}
          {(isMultiple || isMultipleCoIns) && (
            <div className="h-6 w-px bg-gray-200 self-center hidden sm:block"></div>
          )}

          {/* Botón para ver Deducibles y Coaseguros - solo si hay datos múltiples */}
          {(isMultiple || isMultipleCoIns) && (
            <button
              className="text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1.5 px-3 py-1.5 transition-colors"
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

          {/* Separador vertical antes del botón de desglose de mensualidad */}
          {protectedWho !== "solo_yo" && (
            <div className="h-6 w-px bg-gray-200 self-center hidden sm:block"></div>
          )}

          {/* Si no hay deducibles múltiples pero hay desglose mensual */}
          {!(isMultiple || isMultipleCoIns) && protectedWho !== "solo_yo" && (
            <button
              className="text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1.5 px-3 py-1.5 transition-colors"
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

          {/* Si es una pantalla más ancha y hay ambos botones */}
          {(isMultiple || isMultipleCoIns) && protectedWho !== "solo_yo" && (
            <button
              className="text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1.5 px-3 py-1.5 transition-colors"
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
      <div id="pdfIngnore">
        <ContractForm />
      </div>
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
              title="Deducibles y Coaseguros"
              size="4xl"
              fullScreenOnMobile={true}
              maxHeight="90vh"
            >
              <DeductibleAndCoInsuranceInfoModal />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
