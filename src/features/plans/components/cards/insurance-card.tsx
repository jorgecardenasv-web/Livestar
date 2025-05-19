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
import { CoInsuranceData, CoInsuranceCapData } from "../../../quote/types";
import { DebugPlan } from "../debug/debug-plan";

interface InsuranceCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
  };
  plan: Plan;
  paymentType: string;
  isRecommended: boolean;
  showDebug?: boolean;
}

interface Deductibles {
  default?: number | null;
  opcion_2?: { A: number; B: number; C: number; D: number };
  opcion_4?: { A: number; B: number; C: number; D: number };
}

interface CoInsuranceValues {
  value?: number;
  opcion_2?: { A: number; B: number; C: number; D: number };
  opcion_4?: { A: number; B: number; C: number; D: number };
}

export const InsuranceCard: React.FC<InsuranceCardProps> = async ({
  company,
  plan,
  paymentType,
  isRecommended,
  showDebug = false,
}) => {
  // Log para depuración - sólo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`InsuranceCard - Plan ID: ${plan.id}`);
    console.log(`InsuranceCard - additionalInfoHtml presente: ${Boolean(plan.additionalInfoHtml)}`);
    if (plan.additionalInfoHtml) {
      console.log(`InsuranceCard - additionalInfoHtml length: ${plan.additionalInfoHtml.length}`);
    }
  }

  const { prospect, protectWho, additionalInfo } = await getProspect();
  const deductibles: Deductibles = plan.deductibles;
  const coInsuranceData: CoInsuranceValues = plan.coInsurance as CoInsuranceValues;
  const coInsuranceCapData: CoInsuranceValues = plan.coInsuranceCap ? (plan.coInsuranceCap as CoInsuranceValues) : { value: 0 };

  const isMultiple = typeof deductibles["default"] === "number" ? false : true;
  const isMultipleCoInsurance = coInsuranceData && typeof coInsuranceData === 'object' && 'opcion_2' in coInsuranceData;

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
      className={`bg-white rounded shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${isRecommended ? "ring-4 ring-[#00a5e3] " : ""
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
            className="w-44 h-auto mb-4"
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
            {protectWho !== "solo_yo" && (
              <p className="text-sm text-sky-600 font-semibold uppercase mb-1 mt-2">
                {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"}{" "}
                Total
              </p>
            )}
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
            value={getCoInsuranceValue(plan.coInsurance)}
          />
          <InfoItem
            icon={<Heart className="w-5 h-5" />}
            title="Tope coaseguro"
            value={getCoInsuranceCapValue(plan.coInsuranceCap)}
          />
        </div>

        <form action={handleInterestClick}>
          <input type="hidden" name="company" value={company.name} />
          {/* <input type="hidden" name="companyLogo" value={company.logo} /> */}
          <input type="hidden" name="plan" value={plan.planType.name} />
          <input type="hidden" name="paymentType" value={paymentType} />
          <input type="hidden" name="sumInsured" value={plan.sumInsured} />
          <input type="hidden" name="deductible" value={minor} />
          <input
            type="hidden"
            name="coInsurance"
            value={typeof plan.coInsurance === 'object' && plan.coInsurance.value !== undefined
              ? plan.coInsurance.value
              : typeof plan.coInsurance === 'number'
                ? plan.coInsurance
                : 0}
          />
          <input
            type="hidden"
            name="coInsuranceCap"
            value={typeof plan.coInsuranceCap === 'object' && plan.coInsuranceCap?.value !== undefined
              ? plan.coInsuranceCap.value
              : typeof plan.coInsuranceCap === 'number'
                ? plan.coInsuranceCap
                : 0}
          />
          <input
            type="hidden"
            name="isMultipleCoInsurance"
            value={
              typeof plan.coInsurance === 'object' &&
                (plan.coInsurance.opcion_2 || plan.coInsurance.opcion_4) ?
                'true' : 'false'
            }
          />
          <input
            type="hidden"
            name="coInsuranceJson"
            value={JSON.stringify(plan.coInsurance)}
          />
          <input
            type="hidden"
            name="coInsuranceCapJson"
            value={JSON.stringify(plan.coInsuranceCap)}
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
          <input type="hidden" name="protectedWho" value={protectWho} />
          <SubmitButton
            type="submit"
            label="Me interesa"
            labelPending="Seleccionando..."
            className="w-full bg-[#223E99] text-white py-3 rounded font-bold text-lg hover:bg-primary transition duration-300"
          />
        </form>

        {/* Sección de información adicional con mejor estilizado */}
        {plan.additionalInfoHtml && plan.additionalInfoHtml !== '<p></p>' && (
          <div className="mt-6 border-t border-gray-200 pt-4 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-2 text-sky-600">Información Adicional</h3>
            <div
              className="prose prose-sm max-w-none prose-headings:text-sky-600 prose-a:text-blue-600 prose-strong:text-gray-700 prose-ul:pl-5 prose-ul:list-disc prose-ol:pl-5 prose-ol:list-decimal"
              dangerouslySetInnerHTML={{ __html: plan.additionalInfoHtml }}
            />
          </div>
        )}

        {/* Componente de depuración solo visible en desarrollo */}
        {showDebug && <DebugPlan plan={plan} />}
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

function getCoInsuranceValue(coInsurance: any): string {
  if (!coInsurance) return "0%";

  // Si es un valor simple
  if (typeof coInsurance === 'number') return `${coInsurance}%`;

  // Si tiene value (formato simple)
  if (coInsurance.value !== undefined) return `${coInsurance.value}%`;

  // Si es múltiple, buscamos el valor mínimo
  let minValue = 100;

  if (coInsurance.opcion_2) {
    const values = Object.values(coInsurance.opcion_2) as number[];
    const min = Math.min(...values);
    minValue = Math.min(minValue, min);
  }

  if (coInsurance.opcion_4) {
    const values = Object.values(coInsurance.opcion_4) as number[];
    const min = Math.min(...values);
    minValue = Math.min(minValue, min);
  }

  return `DESDE ${minValue}%`;
}

function getCoInsuranceCapValue(coInsuranceCap: any): string {
  if (!coInsuranceCap) return formatCurrency(0);

  // Si es un valor simple
  if (typeof coInsuranceCap === 'number') return formatCurrency(coInsuranceCap);

  // Si tiene value (formato simple)
  if (coInsuranceCap.value !== undefined) return formatCurrency(coInsuranceCap.value);

  // Si es múltiple, buscamos el valor mínimo
  let minValue = Number.MAX_SAFE_INTEGER;

  if (coInsuranceCap.opcion_2) {
    const values = Object.values(coInsuranceCap.opcion_2) as number[];
    const min = Math.min(...values);
    minValue = Math.min(minValue, min);
  }

  if (coInsuranceCap.opcion_4) {
    const values = Object.values(coInsuranceCap.opcion_4) as number[];
    const min = Math.min(...values);
    minValue = Math.min(minValue, min);
  }

  return `DESDE ${formatCurrency(minValue === Number.MAX_SAFE_INTEGER ? 0 : minValue)}`;
}

function getFormattedValue(key: string, value: any, protectWho: any) {
  if (
    key === "main" &&
    ["mi_pareja_y_yo", "familia", "mis_hijos_y_yo"].includes(protectWho)
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

  if (key === "partner" && ["mi_pareja_y_yo", "familia"].includes(protectWho)) {
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
