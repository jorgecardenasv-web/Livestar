"use server";

import { prefix } from "@/features/layout/nav-config/constants";
import { revalidatePath } from "next/cache";
import { updateQuoteService } from "../services/update/update-quote.service";
import { parsedFormDataAge } from "@/shared/utils";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const updateQuote = async (
  quoteId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);
    const parsed = parsedFormDataAge(rawFormData);

    const {
      name,
      age,
      email,
      gender,
      postalCode,
      whatsapp,
      protectWho,
      ...aditionalInfo
    } = parsed;

    const quoute = await updateQuoteService({
      prospect: {
        name: String(name),
        age: Number(age),
        email: String(email),
        gender: String(gender),
        postalCode: String(postalCode),
        whatsapp: String(whatsapp),
      },
      quote: {
        id: quoteId,
        protectWho: String(protectWho),
        ...aditionalInfo,
      },
    });

    revalidatePath(`${prefix}/cotizaciones`);

    return {
      success: true,
      message: "Cotización actualizada correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar la cotización.",
    };
  }
};
