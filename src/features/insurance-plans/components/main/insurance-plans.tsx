import { InsuranceCard } from "../card/insurance-card";
import { getInsuranceState } from "../../actions/add-cookies";
import { PlanSelector } from "../selector/plan-selector";
import { PaymentSelector } from "../selector/payment-selector";
import { CompanyStatus, HospitalTier, PlanStatus } from "@prisma/client";

export const InsurancePlans = async ({
  insurancePlans,
}: {
  insurancePlans: any[];
}) => {
  const { activePlanType, activePaymentType } = await getInsuranceState();

  const planTypes = ["Esencial", "Protegido", "Blindado"];
  const paymentTypes = ["Mensual", "Anual"];

  const company = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "HDI Seguros",
    logo: "/api/images/bupa-hdi.svg",
    description: "Compañía líder en seguros de salud",
    status: CompanyStatus.ACTIVE,
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
  };

  const plan = {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "Hibrido",
    companyId: 1,
    sumInsured: 2000000,
    deductible: 0,
    coInsurance: 0,
    coInsuranceCap: 0,
    hospitalTier: HospitalTier.INTERMEDIATE,
    status: PlanStatus.ACTIVE,
    createdAt: new Date("2024-09-27T11:00:00Z"),
    updatedAt: new Date("2024-09-27T11:00:00Z"),
    totalPrice: 8000,
    isRecommended: true,
    company,
  };

  return (
    <div className="mx-auto px-4 py-2 space-y-4 m-8">
      <div className="flex flex-col justify-center items-center">
        <PlanSelector planTypes={planTypes} activePlanType={activePlanType} />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
        />
      </div>
      <div className="grid grid-flow-col justify-center md:auto-cols-max gap-2 items-end">
        {insurancePlans.map((plan, index) => {
          const activePlan = plan.name === activePlanType ? plan : null;
          return (
            activePlan && (
              <InsuranceCard
                key={`${plan.company.name}-${activePlanType}`}
                company={plan.company}
                plan={activePlan}
                paymentType={activePaymentType}
                isRecommended={index === 0}
              />
            )
          );
        })}
        <InsuranceCard
          key="default-card"
          company={plan.company}
          plan={plan}
          paymentType={activePaymentType}
          isRecommended={false}
        />
      </div>
    </div>
  );
};
