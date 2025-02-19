'use server'
import { simplifyZodErrors } from "@/shared/utils";
import { contactSchema } from "../schemas/contact.schema";

export async function handleContact(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const {success, data, error} = contactSchema.safeParse(rawFormData)
  if(!success) return simplifyZodErrors(error)
  //   Send to BD or Advisor Email
}
