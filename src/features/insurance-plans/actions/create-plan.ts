"use server";

import { prefix } from "@/shared/utils/constants";
import { createPlanService } from "../services/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices } from "../utils";
import { createHospitalLevels } from "../services/create-hospital-levels";

export const createPlan = async (formData: FormData) => {
  const planTypeId = formData.get("planTypeId");
  const companyId = formData.get("companyId");
  const sumInsured = formData.get("sumInsured");
  const coInsurance = formData.get("coInsurance");
  const coInsuranceCap = formData.get("coInsuranceCap");
  const prices = formData.get("prices");
  const rawFormData = {
    planTypeId,
    companyId,
    sumInsured: Number(sumInsured),
    coInsurance: Number(coInsurance),
    coInsuranceCap: Number(coInsuranceCap),
    prices: prices ? flatPricesToJsonPrices(JSON.parse(prices as string)) : {},
  };

  const planId = await createPlanService(rawFormData);
  const hospitalLevels = [
    // menor a 45
    {
      level: "A",
      amount: formData.get("initialPlanA"),
      option: [{ initial: 0, final: 45 }],
    },
    {
      level: "B",
      amount: formData.get("initialPlanB"),
      option: [{ initial: 0, final: 45 }],
    },
    {
      level: "C",
      amount: formData.get("initialPlanC"),
      option: [{ initial: 0, final: 45 }],
    },
    {
      level: "D",
      amount: formData.get("initialPlanD"),
      option: [{ initial: 0, final: 45 }],
    },
    {
      level: "A",
      amount: formData.get("finalPlanA"),
      option: [{ initial: 45, final: 999 }],
    },
    {
      level: "B",
      amount: formData.get("finalPlanB"),
      option: [{ initial: 45, final: 999 }],
    },
    {
      level: "C",
      amount: formData.get("finalPlanC"),
      option: [{ initial: 45, final: 999 }],
    },
    {
      level: "D",
      amount: formData.get("finalPlanD"),
      option: [{ initial: 45, final: 999 }],
    },
  ];
  for (const hospitalLevel of hospitalLevels) {
    await createHospitalLevels({
      hospitalLevel: hospitalLevel,
      planId: planId.id,
    });
  }

  redirect(`${prefix}/planes`);
};
