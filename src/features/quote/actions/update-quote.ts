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

    const medicalDataStr = formData.get("medicalData");
    const medicalData = medicalDataStr
      ? JSON.parse(String(medicalDataStr))
      : [];

    const {
      name,
      age,
      email,
      gender,
      postalCode,
      whatsapp,
      protectWho,
      ...rest
    } = parsed;

    const additionalInfo = Object.fromEntries(
      Object.entries(rest).filter(([key]) =>
        key === "medicalData"
          ? false // Se excluye "medicalData"
          : key.startsWith("$")
            ? false // Se excluyen claves internas
            : !/^answer-/.test(key) &&
              !/^padecimiento-/.test(key) &&
              !/^hospitalizado-/.test(key) &&
              !/^complicacion-/.test(key) &&
              !/^estadoSalud-/.test(key) &&
              !/^medicamento-/.test(key) &&
              !/^detalleComplicacion-/.test(key) &&
              !/^detalleMedicamento-/.test(key)
      )
    );

    const quoteUpdate: any = {
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
        medicalHistories: medicalData,
      },
    };

    if (Object.keys(additionalInfo).length > 0) {
      quoteUpdate.quote.additionalInfo = JSON.parse(JSON.stringify(additionalInfo));
    }

    await updateQuoteService(quoteUpdate);

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
