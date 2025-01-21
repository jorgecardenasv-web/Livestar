import { Quote } from '@prisma/client';
import { sendEmail } from '../config/nodemailer';
import { prospectoTemplate, advisorTemplate } from '../templates/email-templates';

export async function sendProspectEmail({
  prospectName,
  insuranceName,
  planName,
  quotes,
  totalPrice,
  contactNumber,
  logoUrl,
  prospectEmail
}: {
  prospectName: string;
  insuranceName: string;
  planName: string;
  quotes: Quote[];
  totalPrice: number;
  contactNumber: string;
  logoUrl: string;
  prospectEmail: string;
}) {
  const html = prospectoTemplate({
    prospectName,
    insuranceName,
    planName,
    quotes,
    totalPrice,
    contactNumber,
    logoUrl
  });

  return await sendEmail({
    to: prospectEmail,
    subject: 'Cotización preliminar de tu seguro de gastos médicos mayores',
    html
  });
}

export async function sendAdvisorEmail({
  advisorName,
  prospectName,
  prospectEmail,
  selectedPlan,
  emailAdvisor
}: {
  advisorName: string;
  prospectName: string;
  prospectEmail: string;
  selectedPlan: string;
  emailAdvisor: string;
}) {
  const dateOfQuote = new Date().toLocaleString('es-MX', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const html = advisorTemplate({
    advisorName,
    prospectName,
    prospectEmail,
    selectedPlan,
    dateOfQuote
  });

 
  return await sendEmail({
    to: emailAdvisor,
    subject: 'Cotización preliminar de tu seguro de gastos médicos mayores',
    html
  });
}