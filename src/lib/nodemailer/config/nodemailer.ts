import nodemailer from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface SuccessResponse {
  success: true;
  messageId: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type SendEmailResponse = SuccessResponse | ErrorResponse;

const transporter = nodemailer.createTransport({
  host: 'secure.emailsrvr.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<SendEmailResponse> {
  try {
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER as string,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}