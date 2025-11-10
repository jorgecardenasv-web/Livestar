"use server";

import { updateQuoteService } from "../services/update/update-quote.service";
import { parsedFormDataAge } from "@/shared/utils";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prefix } from "@/features/layout/nav-config/constants";

export const updateQuote = async (
  quoteId: string,
  _: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);
    const parsed = parsedFormDataAge(rawFormData);

    const medicalDataStr = formData.get("medicalData");
    const medicalData = medicalDataStr
      ? JSON.parse(String(medicalDataStr))
      : [];

    const prospectStr = formData.get("prospect");
    const prospect = prospectStr ? JSON.parse(String(prospectStr)) : [];

    const {
      name,
      age,
      email,
      gender,
      postalCode,
      whatsapp,
      protectWho,
      prospectId,
      ...rest
    } = prospect;

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

    await updateQuoteService({
      prospect: {
        id: prospectId,
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
        additionalInfo: JSON.parse(JSON.stringify(additionalInfo)),
      },
    });

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

export const removeCookies = async () => {
  console.log(`/cotizar/planes`);

  const cookieStore = cookies();
  cookieStore.delete("createdQuote");
  cookieStore.delete("prospect");

  // revalidatePath(`/cotizar/planes`);
};
