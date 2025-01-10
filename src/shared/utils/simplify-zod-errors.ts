import { ZodError } from "zod";
import { FormError } from "../types";

export const simplifyZodErrors = <T>(errors: ZodError<T>): FormError => {
  const simplifiedErrors: FormError = {};
  errors.issues.forEach((key) => {
    simplifiedErrors[key.path[0]] = key.message;
  });
  return simplifiedErrors;
};
