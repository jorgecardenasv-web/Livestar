"use server";

import { updateQuote } from "@/features/quote/actions/update-quote";
import { getProspectByQuoteId } from "./get-prospect-by-quote";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  cookieStore.delete("prospect");
  cookieStore.delete("selectedPlan");
  cookieStore.delete("activePlanType");
  cookieStore.delete("activePaymentType");
  cookieStore.delete("quoteCreated");
  cookieStore.delete("createdQuoteId");

  return redirect("/cotizar");
};
