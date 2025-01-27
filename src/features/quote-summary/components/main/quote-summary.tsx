"use client";
import Image from "next/image";
import { InsuranceQuoteData } from "@/app/(cliente)/cotizar/page";
import { Shield, DollarSign, Percent, Heart, ArrowLeft } from "lucide-react";
import { ContractForm } from "../forms/confirm-form";
import { InfoCard } from "../cards/info-card";
import { deleteSelectedPlan } from "@/features/insurance-plans/actions/set-cookies";
import { FC, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import MultipleDeductibleModal from "../modals/MultipleDeductibleModal";

export const QuoteSummary: FC<InsuranceQuoteData> = ({
  coInsurance,
  coInsuranceCap,
  coverage_fee,
  deductible,
  sumInsured,
  company,
  imgCompanyLogo,
  plan,
  paymentType,
  id,
  isMultipleString,
  deductiblesJson,
}) => {
  const isMultiple = isMultipleString === "true" ? true : false;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isPriceMonthly = paymentType === "Mensual";
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl shadow-lg border m-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <form action={deleteSelectedPlan}>
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
          width={60}
          height={60}
          className="h-10 sm:h-12 w-auto object-contain"
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
              ${coverage_fee.toLocaleString()}
            </p>
          </div>
          <div className="text-center sm:text-right">
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
          value={`$${sumInsured}`}
        />
        {/* -------------------------------------------------------------------- */}
        <div className="flex justify-between">
          <InfoCard
            icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Deducible"
            value={`${isMultiple ? `desde $${deductible}` : `$${deductible}`}`}
            useHtml={isMultiple}
            htmlElement={
              <div className="pl-8">
                {isMultiple && (
                  <Button
                    className="w-56"
                    size="sm"
                    onClick={handleOpenModal}
                    disabled={false}
                  >
                    DETALLES
                  </Button>
                )}
              </div>
            }
          />
          {isModalOpen && (
            <MultipleDeductibleModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="¿Cuáles serán los gastos en caso de accidente o padecimiento?"
              deductiblesJson={deductiblesJson || ""}
            >
              Si llegaras a tener un padecimiento o accidente, podrás acudir a
              un hospital de cualquier nivel y tu participación sería de acuerdo
              a tu elección:
            </MultipleDeductibleModal>
          )}
        </div>
        {/* -------------------------------------------------------------------- */}
        <InfoCard
          icon={<Percent className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Coaseguro"
          value={`${coInsurance}%`}
        />
        <InfoCard
          icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Tope coaseguro"
          value={`$${coInsuranceCap}`}
        />
      </div>
      <div className="flex justify-center">
        <Button className="w-56 mt-2" size="sm" disabled={false}>
          MÁS INFORMACIÓN
        </Button>
      </div>
      <ContractForm />
    </div>
  );
};
