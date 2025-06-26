import Image from "next/image";
import { calculateInsurancePrice, isHDIPriceTable, getMinimumValueByAge } from "../../utils";
import {
  Shield,
  Percent,
  Heart,
  DollarSign,
  User,
  Users,
  Baby,
  PersonStanding,
} from "lucide-react";
import { handleInterestClick } from "../../actions/set-cookies";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { getProspect } from "../../loaders/get-prospect";
import { getImage } from "../../../../shared/services/get-image.service";
import { formatCurrency } from "@/shared/utils";
import type { HDIPriceTable, PriceTable } from "../../types";
import type { Plan } from "../../types/plan";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import AdditionalInfoCollapsible from "./additional-info-collapsible";

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
  const isMultiple = typeof deductibles.default !== "number";

  const minor =
    typeof deductibles.default === "number"
      ? deductibles.default
      : getMinimumValueByAge(plan.deductibles, prospect, additionalInfo);

  const prices: PriceTable | HDIPriceTable =
    (plan.prices as unknown as PriceTable | HDIPriceTable) || {};

  const isHDIPrice = isHDIPriceTable(prices);

  const { coverage_fee, individualPrices } = calculateInsurancePrice(
    { ...prospect, protectWho, additionalInfo },
    prices,
    paymentType
  );
  //we need to calculate the total segundoMesADoce fee if HDI and payment is mensual, looks a little weird though
  let totalSegundoMesADoce = 0;
  if (isHDIPrice && paymentType === "Mensual") {
    if (typeof individualPrices.main !== "number") {
      totalSegundoMesADoce += individualPrices.main?.segundoMesADoce || 0;
    }
    if (
      individualPrices.partner &&
      typeof individualPrices.partner !== "number"
    ) {
      totalSegundoMesADoce += individualPrices.partner?.segundoMesADoce || 0;
    }
    individualPrices.children.forEach((childPrice) => {
      if (typeof childPrice !== "number") {
        totalSegundoMesADoce += childPrice?.segundoMesADoce || 0;
      }
    });
    individualPrices.parents.forEach((parent) => {
      if (typeof parent.price !== "number") {
        totalSegundoMesADoce += parent.price?.segundoMesADoce || 0;
      }
    });
    individualPrices.others?.forEach((other) => {
      if (typeof other.price !== "number") {
        totalSegundoMesADoce += other.price?.segundoMesADoce || 0;
      }
    });
    totalSegundoMesADoce = Math.round(totalSegundoMesADoce);
  }

  const logoSrc = company.logo ? await getImage(company.logo) : null;

  return (
    <div
      className={`bg-white rounded shadow-lg overflow-hidden w-80 ${isRecommended ? "ring-4 ring-[#00a5e3] " : ""
        }`}
    >
      {isRecommended && (
        <div className="bg-[#00a5e3] text-white text-center py-2 text-sm font-bold">
          RECOMENDADO
        </div>
      )}
      <div className="p-6 overflow-hidden">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={logoSrc?.base64 || "/fallback-image.png"}
            width={128}
            height={128}
            alt={company.name}
            className="w-44 h-auto mb-4"
          />
          <div className="w-full text-center">
            {/* we could left this or change it to the plan name, or change it to plan instead of pago */}
            <p className="text-sm text-sky-600 font-semibold uppercase mb-2">
              {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"}
            </p>
            {isHDIPrice && paymentType === "Mensual" ? (
              <>
                <p className="text-xl font-bold text-[#223E99]">
                  {formatCurrency(coverage_fee)}{" "}
                  <span className="text-base font-normal text-gray-600">
                    /primer mes
                  </span>
                </p>
                <p className="text-xl font-bold text-[#223E99]">
                  {formatCurrency(totalSegundoMesADoce)}{" "}
                  <span className="text-base font-normal text-gray-600">
                    /mes (2-12)
                  </span>
                </p>
              </>
            ) : (
              //works for both cases, HDI and non-HDI
              <p className="text-3xl font-bold text-[#223E99]">
                {formatCurrency(coverage_fee)}{" "}
                <span className="text-base font-normal text-gray-600">
                  {paymentType === "Mensual" ? "/mes" : "/año"}
                </span>{" "}
              </p>
            )}
            {/* {protectWho !== "solo_yo" && (
              <p className="text-sm text-sky-600 font-semibold uppercase mb-1 mt-2">
                {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"}{" "}
                Total
              </p>
            )} */}
          </div>
        </div>

        {protectWho !== "solo_yo" && (
          <div className="mb-6">
            <Accordion
              type="single"
              collapsible
              className="w-full bg-slate-50 border-none rounded-lg"
            >
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 text-sm text-sky-600 font-semibold uppercase hover:no-underline border-none bg-white rounded-lg shadow-sm flex items-center justify-between">
                  <p className="font-sans">
                    {paymentType === "Mensual"
                      ? "Desglose Mensual"
                      : "Desglose Anual"}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-4 rounded space-y-2 shadow-sm">
                  {Object.entries(individualPrices).map(([key, value]) => {
                    const formattedValue = getFormattedValue(
                      key,
                      value,
                      individualPrices.protectWho,
                      paymentType
                    );
                    return formattedValue;
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <InfoItem
            icon={<Shield className="w-5 h-5" />}
            title="Suma asegurada"
            value={`${formatCurrency(plan.sumInsured)}`}
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
            value={getCoInsuranceValue(plan.coInsurance, prospect, additionalInfo)}
          />
          <InfoItem
            icon={<Heart className="w-5 h-5" />}
            title="Tope coaseguro"
            value={getCoInsuranceCapValue(plan.coInsuranceCap, prospect, additionalInfo)}
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

        {/* Sección de información adicional con mejor estilizado - Plegable */}
        {plan.additionalInfoHtml && plan.additionalInfoHtml !== '<p></p>' && (
          <div className="mt-4 border-t border-gray-200 pt-3 animate-fadeIn">
            <AdditionalInfoCollapsible additionalInfoHtml={plan.additionalInfoHtml} />
          </div>
        )}


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



function getCoInsuranceValue(coInsurance: any, prospect: any, additionalInfo: any): string {
  if (!coInsurance) return "0%";

  if (typeof coInsurance === 'number') return `${coInsurance}%`;

  if (coInsurance.value !== undefined) return `${coInsurance.value}%`;

  // Si tiene opciones múltiples, usar la nueva utilidad
  if (coInsurance.opcion_2 || coInsurance.opcion_4) {
    const minValue = getMinimumValueByAge(coInsurance, prospect, additionalInfo);
    return `DESDE ${minValue}%`;
  }

  return "0%";
}

function getCoInsuranceCapValue(coInsuranceCap: any, prospect: any, additionalInfo: any): string {
  if (!coInsuranceCap) return formatCurrency(0);

  if (typeof coInsuranceCap === 'number') return formatCurrency(coInsuranceCap);

  if (coInsuranceCap.value !== undefined) return formatCurrency(coInsuranceCap.value);

  // Si tiene opciones múltiples, usar la nueva utilidad
  if (coInsuranceCap.opcion_2 || coInsuranceCap.opcion_4) {
    const minValue = getMinimumValueByAge(coInsuranceCap, prospect, additionalInfo);
    return `DESDE ${formatCurrency(minValue)}`;
  }

  return formatCurrency(0);
}

function getFormattedValue(
  key: string,
  value: any,
  protectWho: any,
  paymentType: string
) {
  let icon = null;
  let label = "";

  const renderPriceDetails = (price: any) => {
    if (typeof price === "number") {
      return (
        <p className="text-lg font-bold text-[#223E99]">{`$${price.toLocaleString()}`}</p>
      );
    }

    if (
      price &&
      typeof price === "object" &&
      "anual" in price &&
      "primerMes" in price &&
      "segundoMesADoce" in price
    ) {
      if (paymentType === "Mensual") {
        return (
          <div className="flex flex-col items-end text-right">
            <p className="text-sm font-bold text-[#223E99]">
              {formatCurrency(price.primerMes)}
              <span className="text-xs font-normal text-gray-600">
                /primer mes
              </span>
            </p>
            <p className="text-sm font-bold text-[#223E99]">
              {formatCurrency(price.segundoMesADoce)}
              <span className="text-xs font-normal text-gray-600">
                /mes (2-12)
              </span>
            </p>
          </div>
        );
      }
      return (
        <p className="text-lg font-bold text-[#223E99]">
          {formatCurrency(price.anual)}
          <span className="text-xs font-normal text-gray-600">/año</span>
        </p>
      );
    }
    return null;
  };

  switch (key) {
    case "main":
      if (
        ["mi_pareja_y_yo", "familia", "mis_hijos_y_yo"].includes(protectWho)
      ) {
        icon = <User className="w-4 h-4 text-sky-600 flex-shrink-0" />;
        label = "Tú:";
        return (
          <div
            key={key}
            className="flex items-center space-x-4 justify-between"
          >
            <div className="flex items-center space-x-2">
              {icon}
              <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                {label}
              </p>
            </div>
            {renderPriceDetails(value)}
          </div>
        );
      }
      return null;
    case "partner":
      if (["mi_pareja_y_yo", "familia"].includes(protectWho)) {
        icon = <Heart className="w-4 h-4 text-sky-600 flex-shrink-0" />;
        label = "Pareja:";
        return (
          <div
            key={key}
            className="flex items-center space-x-4 justify-between"
          >
            <div className="flex items-center space-x-2">
              {icon}
              <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                {label}
              </p>
            </div>
            {renderPriceDetails(value)}
          </div>
        );
      }
      return null;
    case "parents":
      if (Array.isArray(value) && value.length > 0) {
        return value.map((parent, index) => (
          <div
            key={`${key}-${index.toString()}`}
            className="flex items-center space-x-4 justify-between"
          >
            <div className="flex items-center space-x-2">
              <PersonStanding className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                {`${parent.name}: `}
              </p>
            </div>
            {renderPriceDetails(parent.price)}
          </div>
        ));
      }
      return null;
    case "children":
      if (Array.isArray(value) && value.length > 0) {
        return value.map((child, index) => (
          <div
            key={`${key}-${index.toString()}`}
            className="flex items-center space-x-4 justify-between"
          >
            <div className="flex items-center space-x-2">
              <Baby className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                {`Hijo${value.length > 1 ? ` ${index + 1}` : ""}:`}
              </p>
            </div>
            {renderPriceDetails(child)}
          </div>
        ));
      }
      return null;
    case "others":
      if (Array.isArray(value) && value.length > 0) {
        return value.map((other, index) => (
          <div
            key={`${key}-${index.toString()}`}
            className="flex items-center space-x-4 justify-between"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <p className="text-xs text-sky-600 font-semibold uppercase flex-shrink-0">
                {`${other.relationship}: `}
              </p>
            </div>
            {renderPriceDetails(other.price)}
          </div>
        ));
      }
      return null;
    default:
      return null;
  }
}
