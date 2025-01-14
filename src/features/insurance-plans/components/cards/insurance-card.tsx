import Image from "next/image";
import {
  Insurance,
  Plan,
} from "../../../../shared/types/insurance";
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

export const InsuranceCard: React.FC<InsuranceCardProps> = async ({
  company,
  plan,
  paymentType,
  isRecommended,
}) => {
  const propect = await getProspect();
  const prices: PriceTable = plan.prices as unknown as PriceTable || {}
  const { coverage_fee } = calculateInsurancePrice(propect, prices, paymentType);
  
  const imageName = company.logo.split("/").pop();
  const logoSrc = imageName ? await getImage(imageName) : "";

  return (
    <div
      className={`bg-white rounded shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isRecommended ? "ring-4 ring-[#00a5e3]" : ""
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
            <p className="text-sm text-sky-600 font-semibold uppercase mb-1">
              {paymentType === "Mensual" ? "Pago mensual" : "Pago anual"}
            </p>
            <p className="text-3xl font-bold text-[#223E99]">${coverage_fee}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <InfoItem
            icon={<Shield className="w-5 h-5" />}
            title="Suma asegurada"
            value={`$${plan.sumInsured / 1000000} MILLONES`}
          />
          {/* ------------------ DEDUCIBLE ----------------- */}
          
          <InfoItem
            icon={<DollarSign className="w-5 h-5" />}
            title="Deducible"
            value={`$${plan.planType.name !== "Hibrido" ? 1000 : 0}`}
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
            value={`$${plan.coInsuranceCap}`}
          />
        </div>

        <form action={handleInterestClick}>
          <input type="hidden" name="company" value={company.name} />
          <input type="hidden" name="companyLogo" value={company.logo} />
          <input type="hidden" name="plan" value={plan.planType.name} />
          <input type="hidden" name="paymentType" value={paymentType} />
          <input type="hidden" name="sumInsured" value={plan.sumInsured} />
          {/* <input
            type="hidden"
            name="deductible"
            value={plan.deductible}
          /> */}
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
