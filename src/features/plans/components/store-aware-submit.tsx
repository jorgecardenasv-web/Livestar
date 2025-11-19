"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { useQuoteRuntimeStore } from "@/shared/store/quote-runtime-store";

interface Props {
  label: string;
  labelPending: string;
  className?: string;
  planData: {
    company: string;
    imgCompanyLogo: string;
    plan: string;
    paymentType: string;
    sumInsured: any;
    deductible: any;
    coInsurance: any;
    coInsuranceCap: any;
    coverage_fee: any;
    individualPricesJson?: string;
    id: string;
    isMultipleString?: string;
    deductiblesJson?: string;
    isMultipleCoInsurance?: string;
    coInsuranceJson?: string;
    coInsuranceCapJson?: string;
    protectedWho: any;
  };
}

export default function StoreAwareSubmit({ label, labelPending, className, planData }: Props) {
  const setSelectedPlanData = useQuoteRuntimeStore((s) => s.setSelectedPlanData);
  return (
    <SubmitButton
      type="submit"
      label={label}
      labelPending={labelPending}
      className={className}
      onClick={() => {
        // Guardar snapshot del plan en memoria antes de enviar el formulario
        setSelectedPlanData(planData);
      }}
    />
  );
}