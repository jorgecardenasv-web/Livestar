import Image from "next/image";
import {
  InsuranceCompany,
  InsurancePlan,
} from "../../../shared/types/insurance";
import { calculatePremium } from "../utils/insurance-calculations";

interface InsuranceCardProps {
  company: InsuranceCompany;
  plan: InsurancePlan;
  paymentType: string;
  isRecommended: boolean;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({
  company,
  plan,
  paymentType,
  isRecommended,
}) => {
  const premium = calculatePremium(plan.sumInsured, paymentType);

  const handleInterestClick = () => {
    const planInfo = {
      compañía: company.name,
      plan: plan.name,
      sumaAsegurada: plan.sumInsured.toLocaleString(),
      deducible: plan.deductible.toLocaleString(),
      coaseguro: `${(plan.coInsurance * 100).toFixed(0)}%`,
      topeCoaseguro: plan.coInsuranceCap?.toLocaleString(),
      coberturaDental: plan.benefits.dentalCoverage
        ? "Incluida"
        : "No incluida",
      prima: `${paymentType.toLowerCase()}: $${premium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
    console.log("Información del plan seleccionado:", planInfo);
  };

  return (
    <div
      className={`bg-white w-64 border rounded shadow-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isRecommended ? "ring-4 ring-[#00a5e3] -mt-8 border-0" : ""
      }`}
    >
      {isRecommended && (
        <div className="bg-[#00a5e3] text-white text-center py-2 text-sm font-bold">
          RECOMENDADO
        </div>
      )}
      <div className="p-6">
        <Image
          src={company.logo}
          width={128}
          height={128}
          alt={company.name}
          className="w-32 h-16 mx-auto mb-4"
        />
        <div className="text-3xl font-bold text-center mb-2 text-[#223E99]">
          $
          {premium.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-sm text-zinc-500 text-center mb-4">
          Pago {paymentType.toLowerCase()}
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-zinc-500">Suma asegurada</div>
            <div className="font-bold text-zinc-900">
              ${(plan.sumInsured / 1000000).toFixed(1)} MILLONES
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-500">Deducible</div>
            <div className="font-bold text-zinc-900">
              ${plan.deductible.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-zinc-500">
              $0 deducible por accidente
            </span>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-500">Coaseguro</div>
            <div className="font-bold text-zinc-900">
              {(plan.coInsurance * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-500">Tope coaseguro</div>
            <div className="font-bold text-zinc-900">
              ${plan.coInsuranceCap?.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-500">Dental</div>
            <div className="font-bold text-zinc-900">
              {plan.benefits.dentalCoverage ? "Incluido" : "No incluido"}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleInterestClick}
            className="w-full bg-[#223E99] hover:bg-[#223E99]/90 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00a5e3] focus:ring-opacity-50"
            aria-label={`Me interesa el plan ${plan.name} de ${company.name}`}
          >
            Me interesa
          </button>
        </div>
      </div>
    </div>
  );
};
