import { sendEmail } from "@/lib/nodemailer/config/nodemailer";
import { contractConfirmationTemplate, advisorContractNotificationTemplate } from "@/lib/nodemailer/templates/email-templates";

interface SendContractConfirmationEmailParams {
  prospectName: string;
  prospectEmail: string;
  company: string;
  plan: string;
  advisorName?: string;
  advisorEmail?: string;
  prospectWhatsApp?: string;
}

export const sendContractConfirmationEmail = async ({
  prospectName,
  prospectEmail,
  company,
  plan,
  advisorName = "Asesor",
  advisorEmail,
  prospectWhatsApp = "",
}: SendContractConfirmationEmailParams) => {
  try {
    // Enviar email de confirmación al prospecto
    await sendEmail({
      subject: "Confirmación de Interés en Contratación - Livestar",
      html: contractConfirmationTemplate({
        logoUrl:
          "https://livestar.mx/wp-content/uploads/2021/08/Livestar-logo-color-horizontal.png",
        prospectName,
        company,
        plan,
      }),
      to: prospectEmail,
    });

    // Enviar notificación al asesor si está disponible
    if (advisorEmail) {
      await sendEmail({
        subject: "🎉 Solicitud de Contratación - Acción Requerida",
        html: advisorContractNotificationTemplate({
          advisorName,
          prospectName,
          prospectEmail,
          prospectWhatsApp,
          selectedPlan: `${company} - ${plan}`,
          dateOfQuote: new Date().toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }),
        to: advisorEmail,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error enviando email de confirmación:", error);
    return { success: false, error: "Error enviando el email" };
  }
};
