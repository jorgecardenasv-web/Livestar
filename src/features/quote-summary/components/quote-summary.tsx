import Image from "next/image";
import { InsuranceQuoteData } from "@/app/(cliente)/resumen-de-cotizacion/page";
import { Shield, DollarSign, Percent, Heart } from "lucide-react";
import { ContractForm } from "./confirm-form";
import { InfoCard } from "./info-card";

export const QuoteSummary: React.FC<InsuranceQuoteData> = ({
  coInsurance,
  coInsuranceCap,
  coverage_fee,
  deductible,
  sumInsured,
  company,
  companyLogo,
  plan,
  paymentType,
  id,
}) => {
  const isPriceMonthly = paymentType === "Mensual";
  console.log("plan", plan);
  console.log(id);
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl shadow-lg border">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-tremor-content-emphasis">
          Resumen de cotización
        </h2>
        <Image
          src={companyLogo}
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
              ${coverage_fee}
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
        <InfoCard
          icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Deducible"
          value={`$${deductible}`}
        />
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

      <ContractForm />
    </div>
  );
};
