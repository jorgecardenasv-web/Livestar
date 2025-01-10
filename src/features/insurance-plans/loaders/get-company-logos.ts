"use server";

import { Plan } from "../types/plan";
import { getImage } from "../../../shared/loaders/get-image";

export const getInsuranceLogosFromPlans = async (plans: Plan[]) => {
  const logoPromises = plans.map(async (plan) => {
    if (plan.company.logo) {
      const logoSrc = await getImage(plan.company.logo);
      return { id: plan.id, logoSrc };
    }
    return { id: plan.id, logoSrc: "" };
  });

  const logos = await Promise.all(logoPromises);
  return Object.fromEntries(logos.map(({ id, logoSrc }) => [id, logoSrc]));
};
