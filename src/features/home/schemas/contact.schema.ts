import { string, z } from "zod";

export const contactSchema = z
  .object({
    name: z.string().trim(),
    contactType: z.enum(["email", "phone"]),
    contactMethod: z.string(),
    comment: z.string().optional()
  })
  .superRefine(({ contactType, contactMethod }, ctx) => {
    const cleanedValue = contactMethod.trim();
    if (contactType === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      const phoneNumber = cleanedValue.replace(/\s/g, "");
      if (!phoneRegex.test(phoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El teléfono debe tener 10 dígitos",
          path: ["contactMethod"],
        });
      }
    } else if (contactType === "email") {
      const emailSchema = z.string().email();
      const result = emailSchema.safeParse(cleanedValue);
      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El correo electrónico no es válido",
          path: ["contactMethod"],
        });
      }
    }
  });
