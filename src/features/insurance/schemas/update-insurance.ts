import { z } from "zod";
import { zfd } from "zod-form-data";

const imageValidation = z.union([
  zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"].includes(
          file.type
        ),
      {
        message:
          "El archivo debe ser una imagen en formato JPG, JPEG, PNG o SVG.",
      }
    ),
  z.string(),
]);

export const updateInsuranceSchema = z.object({
  name: z.string().optional(),
  logo: imageValidation.optional(),
});
