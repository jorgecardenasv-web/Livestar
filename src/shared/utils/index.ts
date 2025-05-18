import { ZodError } from "zod";
import { FormError } from "../types";
export * from "./format-date";

export function simplifyZodErrors<T>(errors: ZodError<T>): FormError {
  const simplifiedErrors: FormError = {};

  errors.issues.forEach((key: any) => {
    simplifiedErrors[key.path[0]] = key.message;
  });

  return simplifiedErrors;
}

export const isServer = () => typeof window === "undefined";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export const formatPercentage = (value: number) => `${value}%`;

export * from "./notification-message";
export * from "./simplify-zod-errors";
export * from "./parsed-form-data-age";
