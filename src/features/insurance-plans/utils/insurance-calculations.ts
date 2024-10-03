import { InsurancePlan } from "@/shared/types/insurance";

export const calculateTotalPrice = (
  totalPrice: InsurancePlan["totalPrice"],
  paymentType: string,
): number => {
  const MONTHS_IN_YEAR = 12;

  if (paymentType === "Mensual") {
    totalPrice /= MONTHS_IN_YEAR;
  }

  return Math.round(totalPrice * 100) / 100;
};
