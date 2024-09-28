"use client";

import { useState } from "react";
import { PaymentSelector } from "./payment-selector";
import { PlanSelector } from "./plan-selector";
import { insuranceCompanies } from "../data/insurance-data";
import { InsuranceCard } from "./insurance-card";

export default function InsurancePlans() {
  const [activePlanType, setActivePlanType] = useState("Esencial");
  const [activePaymentType, setActivePaymentType] = useState("Mensual");
  const planTypes = ["Esencial", "Protegido", "Blindado"];
  const paymentTypes = ["Mensual", "Anual"];

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col justify-center items-center mb-14 gap-y-1">
        <PlanSelector
          planTypes={planTypes}
          activePlanType={activePlanType}
          setActivePlanType={setActivePlanType}
        />
        <PaymentSelector
          paymentTypes={paymentTypes}
          activePaymentType={activePaymentType}
          setActivePaymentType={setActivePaymentType}
        />
      </div>
      <div className="grid grid-flow-col md:auto-cols-max gap-2 items-end">
        {insuranceCompanies.map((company, index) => {
          const activePlan = company.plans.find(
            (plan) => plan.name === activePlanType
          );
          return (
            activePlan && (
              <InsuranceCard
                key={`${company.name}-${activePlanType}`}
                company={company}
                plan={activePlan}
                paymentType={activePaymentType}
                isRecommended={index === 1}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
