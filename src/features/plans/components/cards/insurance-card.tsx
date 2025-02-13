import Image from "next/image";
import { calculateInsurancePrice } from "../../utils";
import { Shield, Percent, Heart, DollarSign } from "lucide-react";
import { handleInterestClick } from "../../actions/set-cookies";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { getProspect } from "../../loaders/get-prospect";
import { getImage } from "../../../../shared/services/get-image.service";
import { formatCurrency } from "@/shared/utils";
import {
  PriceTable,
} from "../../types";
import { Plan } from "../../types/plan";

interface InsuranceCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
  };
  plan: Plan;
  paymentType: string;
  isRecommended: boolean;
}

interface Deductibles {
  default?: number | null;
  opcion_2?: { A: number; B: number; C: number; D: number };
  opcion_4?: { A: number; B: number; C: number; D: number };
}

export const InsuranceCard: React.FC<InsuranceCardProps> = async ({
  company,
  plan,
  paymentType,
  isRecommended,
}) => {
  const { prospect, protectWho, additionalInfo } = await getProspect();
  const deductibles: Deductibles = plan.deductibles;

  const isMultiple = typeof deductibles["default"] === "number" ? false : true;

  const minor = typeof deductibles["default"] === "number"
    ? deductibles["default"]
    : getMinimumValue(plan.deductibles, prospect.age);

  const prices: PriceTable = (plan.prices as unknown as PriceTable) || {};
  const { coverage_fee, individualPrices } = calculateInsurancePrice(
    { ...prospect, protectWho, additionalInfo },
    prices,
    paymentType
  );

  const logoSrc = company.logo ? await getImage(company.logo) : null;

  return (
    <div
      className={`bg-white rounded shadow-lg overflow-hidden w-72 transition-all duration-300 hover:shadow-xl ${isRecommended ? "ring-4 ring-[#00a5e3] " : ""
        }`}
    >
      {isRecommended && (
        <div className="bg-[#00a5e3] text-white text-center py-2 text-sm font-bold">
          RECOMENDADO
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={logoSrc?.base64 || '/fallback-image.png'}
            width={128}
            height={128}
            alt={company.name}
            className="w-32 h-16 object-contain mb-4"
          />
          <div className="text-center">
            <p className="text-sm text-sky-600 font-semibold uppercase mb-2">
              {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"}
            </p>
            {Object.entries(individualPrices).map(([key, value], index) => {
              const formattedValue = getFormattedValue(
                key,
                value,
                individualPrices.protectWho
              );
              return <div key={index}> {formattedValue}</div>;
            })}
            <p className="text-sm text-sky-600 font-semibold uppercase mb-1 mt-2">
              {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"} Total
            </p>
            <p className="text-3xl font-bold text-[#223E99]">
              {formatCurrency(coverage_fee)}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <InfoItem
            icon={<Shield className="w-5 h-5" />}
            title="Suma asegurada"
            value={`${formatCurrency(plan.sumInsured / 1000000)} MILLONES`}
          />
          {/* ------------------ DEDUCIBLE ----------------- */}
          <InfoItem
            icon={<DollarSign className="w-5 h-5" />}
            title="Deducible"
            value={`${isMultiple ? "DESDE" : ""} ${formatCurrency(minor)}`}
          />
          {/* ---------------------------------------------- */}
          <InfoItem
            icon={<Percent className="w-5 h-5" />}
            title="Coaseguro"
            value={`${plan.coInsurance}%`}
          />
          <InfoItem
            icon={<Heart className="w-5 h-5" />}
            title="Tope coaseguro"
            value={`${formatCurrency(plan.coInsuranceCap || 0)}`}
          />
        </div>

        <form action={handleInterestClick}>
          <input type="hidden" name="company" value={company.name} />
          {/* <input type="hidden" name="companyLogo" value={company.logo} /> */}
          <input type="hidden" name="plan" value={plan.planType.name} />
          <input type="hidden" name="paymentType" value={paymentType} />
          <input type="hidden" name="sumInsured" value={plan.sumInsured} />
          <input type="hidden" name="deductible" value={minor} />
          <input type="hidden" name="coInsurance" value={plan.coInsurance} />
          <input
            type="hidden"
            name="coInsuranceCap"
            value={plan.coInsuranceCap || 0}
          />
          <input type="hidden" name="coverage_fee" value={coverage_fee} />
          <input
            type="hidden"
            name="individualPricesJson"
            value={JSON.stringify(individualPrices)}
          />
          <input type="hidden" name="id" value={plan.id} />
          <input
            type="hidden"
            name="isMultipleString"
            value={isMultiple.toString()}
          />
          <input
            type="hidden"
            name="deductiblesJson"
            value={JSON.stringify(deductibles)}
          />
          <SubmitButton
            type="submit"
            label="Me interesa"
            labelPending="Seleccionando..."
            className="w-full bg-[#223E99] text-white py-3 rounded font-bold text-lg hover:bg-primary transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-3">
    <div className="bg-sky-100 p-2 rounded-lg text-sky-600">{icon}</div>
    <div>
      <p className="text-xs text-sky-600 font-semibold uppercase">{title}</p>
      <p className="text-lg font-bold text-[#223E99]">{value}</p>
    </div>
  </div>
);

function getMinimumValue(
  options: Record<string, Record<string, number>>,
  age: number
): number {
  if (!options) return 0;

  const option = age < 45 ? options.opcion_2 : options.opcion_4;
  if (!option) return 0;

  const valores = Object.values(option);
  return valores.length > 0 ? Math.min(...valores) : 0;
}

function getFormattedValue(key: string, value: any, protectWho: any) {
  if (
    key === "main" &&
    ["solo_yo", "mi_pareja_y_yo", "familia", "mis_hijos_y_yo"].includes(
      protectWho
    )
  ) {
    return (
      <div className="flex items-center space-x-4 justify-between">
        <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
          {`Tú: `}
        </p>
        <p className="text-lg font-bold text-[#223E99]">
          {`$${(value ?? 0).toLocaleString()}`}
        </p>
      </div>
    );
  }

  if (
    key === "partner" &&
    ["mi_pareja_y_yo", "familia"].includes(protectWho)
  ) {
    return (
      <div className="flex items-center space-x-4 justify-between">
        <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
          {`Pareja: `}
        </p>
        <p className="text-lg font-bold text-[#223E99]">
          {`$${(value ?? 0).toLocaleString()}`}
        </p>
      </div>
    );
  }

  if (Array.isArray(value) && value.length === 0)
    return <div className="hidden"></div>;

  if (key === "parents" && Array.isArray(value)) {
    return value.map((parent, index) => (
      <div key={index} className="flex items-center space-x-4 justify-between">
        <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
          {`${parent.name}: `}
        </p>
        <p className="text-lg font-bold text-[#223E99]">
          {`$${(parent.price ?? 0).toLocaleString()}`}
        </p>
      </div>
    ));
  }

  if (key === "children" && Array.isArray(value)) {
    return value.map((child, index) => (
      <div key={index} className="flex items-center space-x-4 justify-between">
        <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
          {`Hijo${value.length > 1 ? ` ${index + 1}` : ""}:`}
        </p>
        <p className="text-lg font-bold text-[#223E99]">
          {`$${(child ?? 0).toLocaleString()}`}
        </p>
      </div>
    ));
  }

  if (key === "others" && Array.isArray(value)) {
    return value.map((other, index) => (
      <div key={index} className="flex items-center space-x-4 justify-between">
        <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
          {`${other.relationship}: `}
        </p>
        <p className="text-lg font-bold text-[#223E99]">
          {`$${(other.price ?? 0).toLocaleString()}`}
        </p>
      </div>
    ));
  }
}
