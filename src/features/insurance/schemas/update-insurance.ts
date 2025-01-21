import { z } from "zod";
import { zfd } from "zod-form-data";

export const editInsuranceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  logo: zfd
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
    )
    .optional(),
});
