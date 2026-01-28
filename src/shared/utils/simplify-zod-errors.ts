import { ZodError } from "zod";
import { FormError } from "../types";

export const simplifyZodErrors = <T>(errors: ZodError<T>): FormError => {
  const simplifiedErrors: FormError = {};
  errors.issues.forEach((key) => {
    const fieldKey = key.path[0];
    if (typeof fieldKey === "string" || typeof fieldKey === "number") {
      simplifiedErrors[String(fieldKey)] = key.message;
    }
  });
  return simplifiedErrors;
};
