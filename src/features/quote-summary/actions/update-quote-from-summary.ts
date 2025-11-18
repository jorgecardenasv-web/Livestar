"use server";

import { cookies } from "next/headers";
import { updateQuote } from "@/features/quote/actions/update-quote";
import { getProspect } from "@/features/plans/loaders/get-prospect";

export const updateQuoteFromSummary = async (
  prevState: any,
  formData: FormData
) => {
  const cookieStore = cookies();
  const quoteIdFromForm = formData.get("quoteId")?.toString();
  const quoteId = quoteIdFromForm || cookieStore.get("createdQuoteId")?.value;

  if (!quoteId) {
    return {
      success: false,
      message: "No se encontró una cotización creada para actualizar.",
    };
  }

  const { prospect, protectWho, additionalInfo } = await getProspect();

  // Completar datos del prospecto para respetar estructura existente
  formData.set("name", String(prospect?.name ?? ""));
  formData.set("age", String(prospect?.age ?? ""));
  formData.set("email", String(prospect?.email ?? ""));
  formData.set("gender", String(prospect?.gender ?? ""));
  formData.set("postalCode", String(prospect?.postalCode ?? ""));
  formData.set("whatsapp", String(prospect?.whatsapp ?? ""));
  formData.set("protectWho", String(protectWho ?? ""));

  // Incluir campos de additionalInfo para evitar que se limpien
  if (additionalInfo && typeof additionalInfo === "object") {
    Object.entries(additionalInfo).forEach(([key, value]) => {
      try {
        const val = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
        formData.set(key, val);
      } catch {
        // Si no se puede serializar, se omite silenciosamente
      }
    });
  }

  return await updateQuote(quoteId, prevState, formData);
};