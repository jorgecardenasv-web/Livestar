import { sendEmail } from "@/lib/nodemailer/config/nodemailer";
import {
  advisorTemplate,
  prospectoTemplate,
  prospectoTemplateBefore,
} from "@/lib/nodemailer/templates/email-templates";

interface SendQuoteEmailParams {
  prospectName: string;
  prospectEmail: string;
  whatsapp: string;
  pdfBuffer: any;
  company: string;
  plan: string;
  advisorName?: string;
  advisorEmail?: string;
}

export const sendQuoteEmailService = async ({
  prospectName,
  prospectEmail,
  whatsapp,
  pdfBuffer,
  company,
  plan,
  advisorName = "Asesor",
  advisorEmail,
}: SendQuoteEmailParams) => {
  try {
    await sendEmail({
      subject: "Cotización de Seguro de Gastos Médicos",
      html: prospectoTemplate({
        logoUrl:
          "https://livestar.mx/wp-content/uploads/2021/08/Livestar-logo-color-horizontal.png",
        prospectName,
      }),
      to: prospectEmail,
      attachments: [
        {
          filename: `cotizacion-${company}-${plan}.pdf`,
          content: Buffer.from(pdfBuffer.split(';base64,').pop(), 'base64'),
          contentType: "application/pdf",
        },
      ],
    });

    if (advisorEmail) {
      await sendEmail({
        subject: "Nuevo Prospecto: Cotización Generada",
        html: advisorTemplate({
          advisorName,
          prospectName,
          prospectEmail,
          prospectWhatsApp: whatsapp,
          selectedPlan: `${company} - ${plan}`,
          dateOfQuote: new Date().toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }),
        to: advisorEmail,
        attachments: [
          {
            filename: `cotizacion-${company}-${plan}.pdf`,
            content: Buffer.from(pdfBuffer.split(';base64,').pop(), 'base64'),
            contentType: "application/pdf",
          },
        ],
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error enviando email:", error);
    return { success: false, error: "Error enviando el email" };
  }
};

export const sendQuoteEmailProspectService = async ({
  prospectName,
  prospectEmail,
  pdfBuffer,
  company,
  plan,
}: {
  prospectName: string;
  prospectEmail: string;
  pdfBuffer: any;
  company: string;
  plan: string;
}) => {
  try {
    await sendEmail({
      subject: "Cotización de Seguro de Gastos Médicos",
      html: prospectoTemplateBefore({
        logoUrl:
          "https://livestar.mx/wp-content/uploads/2021/08/Livestar-logo-color-horizontal.png",
        prospectName,
      }),
      to: prospectEmail,
      attachments: [
        {
          filename: `cotizacion-${company}-${plan}.pdf`,
          content: Buffer.from(pdfBuffer.split(';base64,').pop(), 'base64'),
          contentType: "application/pdf",
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error("Error enviando email:", error);
    return { success: false, error: "Error enviando el email" };
  }
};
