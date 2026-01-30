"use server";

import { updateQuote } from "@/features/quote/actions/update-quote";
import { getProspectByQuoteId } from "./get-prospect-by-quote";
import { cookies } from "next/headers";
import { sendContractConfirmationEmail } from "../services/send-contract-confirmation-email";
import { getQuoteByIdService } from "@/features/quote/services/read/get-quote-by-id.service";
import { after } from "next/server";

export const updateQuoteFromSummary = async (
  prevState: any,
  formData: FormData
) => {
  const quoteId = formData.get("quoteId")?.toString();

  if (!quoteId) {
    return {
      success: false,
      message: "No se encontró una cotización creada para actualizar.",
    };
  }

  const { prospect, protectWho, additionalInfo } =
    await getProspectByQuoteId(quoteId);

  if (
    !prospect ||
    typeof prospect !== "object" ||
    !("name" in prospect) ||
    !prospect.name
  ) {
    return {
      success: false,
      message: "No se pudieron obtener los datos de la cotización.",
    };
  }

  formData.set("name", String((prospect as any).name ?? ""));
  formData.set("age", String((prospect as any).age ?? ""));
  formData.set("email", String((prospect as any).email ?? ""));
  formData.set("gender", String((prospect as any).gender ?? ""));
  formData.set("postalCode", String((prospect as any).postalCode ?? ""));
  formData.set("whatsapp", String((prospect as any).whatsapp ?? ""));
  formData.set("protectWho", String(protectWho ?? ""));
  formData.set("isVerified", "true");

  if (additionalInfo && typeof additionalInfo === "object") {
    const info = additionalInfo as any;

    if (Array.isArray(info.children)) {
      info.children.forEach((child: any, index: number) => {
        if (child.age) formData.set(`childAge${index}`, String(child.age));
        if (child.gender)
          formData.set(`childGender${index}`, String(child.gender));
      });
      formData.set("childrenCount", String(info.children.length));
    }

    if (Array.isArray(info.protectedPersons)) {
      info.protectedPersons.forEach((person: any, index: number) => {
        if (person.age)
          formData.set(`protectedAge${index}`, String(person.age));
        if (person.gender)
          formData.set(`protectedGender${index}`, String(person.gender));
        if (person.relationship)
          formData.set(
            `protectedRelationship${index}`,
            String(person.relationship)
          );
      });
      formData.set("protectedCount", String(info.protectedPersons.length));
    }

    Object.entries(additionalInfo).forEach(([key, value]) => {
      if (key === "children" || key === "protectedPersons") return;

      try {
        const val =
          typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
        formData.set(key, val);
      } catch {
      }
    });
  }

  const result = await updateQuote(quoteId, prevState, formData);

  if (!result?.success) {
    return result;
  }

  // Enviar email de confirmación en segundo plano sin bloquear la respuesta
  after(async () => {
    try {
      const quote = await getQuoteByIdService(quoteId);
      if (quote && quote.planData) {
        await sendContractConfirmationEmail({
          prospectName: (prospect as any).name,
          prospectEmail: (prospect as any).email,
          company: quote.planData.companyName,
          plan: quote.planData.planTypeName,
          advisorName: quote.user?.name || "Asesor",
          advisorEmail: quote.user?.email || undefined,
          prospectWhatsApp: (prospect as any).whatsapp || "",
        });
      }
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
    }
  });

  // NO borrar las cookies aquí para evitar que Next.js recargue la página
  // Las cookies se borrarán cuando el usuario haga una nueva cotización
  // const cookieStore = await cookies();
  // cookieStore.delete("prospect");
  // cookieStore.delete("selectedPlan");
  // cookieStore.delete("activePlanType");
  // cookieStore.delete("activePaymentType");
  // cookieStore.delete("quoteCreated");
  // cookieStore.delete("createdQuoteId");

  return {
    success: true,
    message: "Tu solicitud ha sido enviada exitosamente. Un asesor se pondrá en contacto contigo lo antes posible.",
  };
};
