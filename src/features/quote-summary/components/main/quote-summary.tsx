"use client";

import Image from "next/image";
import { Shield, DollarSign, Percent, Heart, ArrowLeft, FileText, Download, Users } from "lucide-react";
import { ContractForm } from "../forms/confirm-form";
import { InfoCard } from "../cards/info-card";
import { deleteSelectedPlan } from "@/features/plans/actions/set-cookies";
import { FC } from "react";
import MultipleDeductibleModal from "../modals/MultipleDeductibleModal";
import MultipleCoInsuranceModal from "../modals/MultipleCoInsuranceModal";
import CombinedInfoModal from "../modals/CombinedInfoModal";
import { formatCurrency } from "@/shared/utils";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";
import { Modal } from "@/shared/components/ui/modal";
import MoreInformationQuote from "../modals/MoreInformationModal";
import { Button } from "@/shared/components/ui/button";
import { generatePDFAction } from "../../actions/generate-pdf";
import { processPDFData } from "../../utils/process-pdf-data.util"
import { InsuranceQuoteData } from "../../types";

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
    openModalMultipleDeductible,
    openModal,
  } = useQuoteSumaryActions();

  // Ya no necesitamos el menú desplegable de opciones ya que ahora mostramos los botones directamente
  //! -------------------------------------------------------------------
  const handleGeneratePDF = async () => {
    try {
      console.log("Generando PDF con los siguientes datos:", props);

      const pdfData = processPDFData(props);
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
    }
  };
  //! -------------------------------------------------------------------

  const isPriceMonthly = paymentType === "Mensual";
  return (
    <div
      id="quote-summary"
      className="max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl shadow-lg border m-8"
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
            <p className="text-xs sm:text-sm text-sky-600 font-semibold uppercase">
              Total {isPriceMonthly ? "Mensual" : "Anual"}
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-[#223E99]">
              {formatCurrency(coverage_fee)}
            </p>
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
            value={`${isMultipleCoIns ? `desde ${coInsurance}%` : `${coInsurance}%`}`}
            useHtml={isMultipleCoIns}
            htmlElement={<div className="pl-8"></div>}
          />
        </div>
        <div className="flex justify-between">
          <InfoCard
            icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Tope coaseguro"
            value={`${isMultipleCoIns ? `desde ${formatCurrency(coInsuranceCap)}` : formatCurrency(coInsuranceCap)}`}
            useHtml={isMultipleCoIns}
            htmlElement={<div className="pl-8"></div>}
          />
        </div>
      </div>
      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {/* Botón de descarga de PDF siempre visible */}
          <button
            className="text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1.5 px-3 py-1.5 transition-colors"
            onClick={handleGeneratePDF}
          >
            <Download className="w-4 h-4" />
            Descargar Cotización
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
        <Modal title="" size="6xl">
          {modalType === "multipleDeducible" && <MultipleDeductibleModal />}
          {modalType === "moreInformationQuote" && <MoreInformationQuote />}
          {modalType === "multipleCoInsurance" && <MultipleCoInsuranceModal />}
          {modalType === "combinedInfo" && <CombinedInfoModal />}
        </Modal>
      )}
    </div>
  );
};
