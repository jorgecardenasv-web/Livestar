import Image from "next/image";
import { Insurance, Plan } from "../../../../shared/types/insurance";
import { calculateInsurancePrice } from "../../utils";
import { Shield, Percent, Heart, DollarSign } from "lucide-react";
import { handleInterestClick } from "../../actions/set-cookies";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { getProspect } from "../../loaders/get-prospect";
import { PriceTable } from "../../types";
import { getImage } from "../../../../shared/loaders/get-image";

interface InsuranceCardProps {
  company: Insurance;
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
  const prospect = await getProspect();
  const deductibles: Deductibles = plan.deductibles;

  const isMultiple = deductibles["default"]
    ? deductibles["default"] >= 0
      ? false
      : true
    : true;

  const minor = deductibles["default"]
    ? deductibles["default"]
    : getMinimumValue(plan.deductibles, prospect.age);

  const prices: PriceTable = (plan.prices as unknown as PriceTable) || {};
  const { coverage_fee, individualPrices } = calculateInsurancePrice(
    prospect,
    prices,
    paymentType
  );

  const imageName = company.logo.split("/").pop();
  const logoSrc = imageName ? await getImage(imageName) : "";

  return (
    <div
      className={`bg-white rounded shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isRecommended ? "ring-4 ring-[#00a5e3] " : ""
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
            src={logoSrc}
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
              const formattedValue = getFormattedValue(key, value);
              return (
                <div
                  key={index}
                  className={`${(getCustomKey(key) === "Hijo(s)" || getCustomKey(key) === "Padres") && formattedValue !== "$0" ? "space-x-4 justify-between" : "flex items-center space-x-4 justify-between"}`}
                >
                  {" "}
                  <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                    {" "}
                    {getCustomKey(key)}
                  </p>
                  <p className="text-lg font-bold text-[#223E99]">
                    {formattedValue}
                  </p>
                </div>
              );
            })}
            <p className="text-sm text-sky-600 font-semibold uppercase mb-1 mt-2">
              {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"} Total
            </p>
            <p className="text-3xl font-bold text-[#223E99]">
              ${coverage_fee.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <InfoItem
            icon={<Shield className="w-5 h-5" />}
            title="Suma asegurada"
            value={`$${(plan.sumInsured / 1000000).toLocaleString()} MILLONES`}
          />
          {/* ------------------ DEDUCIBLE ----------------- */}
          <InfoItem
            icon={<DollarSign className="w-5 h-5" />}
            title="Deducible"
            value={`${isMultiple ? "DESDE" : ""} $${minor.toLocaleString()}`}
          />
          {/* ---------------------------------------------- */}
          <InfoItem
            icon={<Percent className="w-5 h-5" />}
            title="Coaseguro"
            value={`${(plan.coInsurance * 100).toFixed(0)}%`}
          />
          <InfoItem
            icon={<Heart className="w-5 h-5" />}
            title="Tope coaseguro"
            value={`$${plan.coInsuranceCap?.toLocaleString()}`}
          />
        </div>

        <form action={handleInterestClick}>
          <input type="hidden" name="company" value={company.name} />
          <input type="hidden" name="companyLogo" value={company.logo} />
          <input type="hidden" name="plan" value={plan.planType.name} />
          <input type="hidden" name="paymentType" value={paymentType} />
          <input type="hidden" name="sumInsured" value={plan.sumInsured} />
          <input type="hidden" name="deductible" value={minor} />
          <input
            type="hidden"
            name="coInsurance"
            value={`${(plan.coInsurance * 100).toFixed(0)}`}
          />
          <input
            type="hidden"
            name="coInsuranceCap"
            value={plan.coInsuranceCap?.toLocaleString()}
          />
          <input
            type="hidden"
            name="coverage_fee"
            value={coverage_fee.toLocaleString()}
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
  const option = age < 45 ? options.opcion_2 : options.opcion_4;
  const valores = Object.values(option).flat();
  return valores.length > 0 ? Math.min(...valores) : 0;
}

function getFormattedValue(key: string, value: any) {
  if (key === "parents" && Array.isArray(value)) {
    if (value.length === 0) return "$0";
    return value
      .map((parent: any) => `${parent.name}: $${parent.price.toLocaleString()}`)
      .join(" | ");
  }

  if (key === "children" && Array.isArray(value)) {
    if (value.length === 0) return "$0";

    if (value.length > 1) {
      return value
        .map((child, index) => {
          return `Hijo ${index + 1}: $${child.toLocaleString()}`;
        })
        .join(" | ");
    }
    return `Hijo: $${value[0].toLocaleString()}`;
  }

  if (Array.isArray(value)) {
    return value.join(", ").toLocaleString();
  }

  return `$${value.toLocaleString()}`;
}

function getCustomKey(key: string) {
  const keyMapping: { [key: string]: string } = {
    main: "Tú",
    partner: "Pareja",
    children: "Hijo(s)",
    parents: "Padres",
  };
  return keyMapping[key] || key;
}
