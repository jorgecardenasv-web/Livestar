import { z } from "zod";
import { zfd } from "zod-form-data";

const imageValidation = zfd
  .file()
  .refine((file) => file.size < 5000000, {
    message: "El archivo no puede ser mayor a 5MB",
  })
  .refine((file) => file.type.startsWith("image/"), {
    message: "El archivo debe ser una imagen",
  });

export const createInsuranceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logo: imageValidation,
});
