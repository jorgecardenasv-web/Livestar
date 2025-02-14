import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

function validateEnvVariables() {
  const requiredVars = {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Variables de entorno requeridas no encontradas: ${missingVars.join(", ")}`
    );
  }
}

// Validar variables de entorno antes de crear el transporter
try {
  validateEnvVariables();
} catch (error) {
  console.error("Error de configuración:", error);
  throw error;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
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
  service: "SMTP",
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

async function verifyConnection(transporter: nodemailer.Transporter) {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Error de conexión SMTP:", error);
    return false;
  }
}

async function retryConnection(attempts: number = 0): Promise<boolean> {
  if (attempts >= MAX_RETRIES) return false;

  const isConnected = await verifyConnection(transporter);
  if (isConnected) return true;

  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
  return retryConnection(attempts + 1);
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: SendEmailParams): Promise<SendEmailResponse> {
  try {
    // Validar nuevamente por si las variables cambiaron en runtime
    validateEnvVariables();

    const isConnected = await retryConnection();
    if (!isConnected) {
      throw new Error(
        "No se pudo establecer conexión con el servidor SMTP después de varios intentos"
      );
    }

    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER!,
      to,
      subject,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error al enviar el correo:", error);

    let errorMessage = "Error desconocido";
    if (error instanceof Error) {
      if (error.message.includes("Variables de entorno")) {
        errorMessage = error.message;
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "No se pudo conectar al servidor de correo";
      } else if (error.message.includes("ETIMEDOUT")) {
        errorMessage = "Tiempo de espera agotado al conectar con el servidor";
      } else if (error.message.includes("AUTH")) {
        errorMessage = "Error de autenticación con el servidor de correo";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
