import { ZodError } from "zod";
import { FormError } from "../types";

const ERROR_TYPES = {
  too_small: "tooSmall",
  too_big: "tooBig",
  invalid_string: "invalidString",
  invalid_type: "invalidType",
  custom: "custom",
} as const;

export function simplifyZodErrors<T>(errors: ZodError<T>): FormError {
  const simplifiedErrors: FormError = {};
  errors.issues.forEach((key) => {
    simplifiedErrors[key.path[0]] = key.message;
  });
  return simplifiedErrors;
}
