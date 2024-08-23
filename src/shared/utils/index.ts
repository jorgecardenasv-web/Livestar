import { ZodError } from "zod";
import { FormError } from "../types";
export * from "./format-date";

export function simplifyZodErrors<T>(errors: ZodError<T>): FormError {
  const simplifiedErrors: FormError = {};
  errors.issues.forEach((key) => {
    simplifiedErrors[key.path[0]] = key.message;
  });
  return simplifiedErrors;
}

export const isServer = () => typeof window === "undefined";
