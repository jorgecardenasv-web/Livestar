import { ZodError } from "zod";
import { FormError } from "../types";

const ERROR_TYPES = {
  too_small: "tooSmall",
  too_big: "tooBig",
  invalid_string: "invalidString",
  invalid_type: "invalidType",
  custom: "custom"
} as const;

export function simplifyZodErrors<T>(errors: ZodError<T>): FormError {
  return errors.issues.reduce((simplifiedErrors, key) => {
    const errorType = ERROR_TYPES[key.code as keyof typeof ERROR_TYPES] || "default";
    simplifiedErrors[key.path[0]] = `errors.${key.path[0]}.${errorType}`;
    return simplifiedErrors;
  }, {} as FormError);
}