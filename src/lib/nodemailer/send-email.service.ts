import { sendEmail } from ".";

export async function notifyInsuranceInterest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !phone) {
    return { success: false, message: "Todos los campos son requeridos" };
  }

  const asesorEmail = process.env.ASESOR_EMAIL || "asesor@ejemplo.com";

  try {
    await sendEmail({
      to: asesorEmail,
      subject: "Nuevo prospecto interesado en seguro de gastos médicos",
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}`,
      html: `
        <h1>Nuevo prospecto interesado en seguro de gastos médicos</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
      `,
    });

    await sendEmail({
      to: email,
      subject: "Gracias por tu interés en nuestro seguro de gastos médicos",
      text: `Estimado/a ${name},\n\nGracias por tu interés en nuestro seguro de gastos médicos. Un asesor se pondrá en contacto contigo pronto para brindarte más información.\n\nSaludos cordiales,\nLivestar`,
      html: `
        <h1>Gracias por tu interés en nuestro seguro de gastos médicos</h1>
        <p>Estimado/a ${name},</p>
        <p>Gracias por tu interés en nuestro seguro de gastos médicos. Un asesor se pondrá en contacto contigo pronto para brindarte más información.</p>
        <p>Saludos cordiales,<br>Livestar</p>
      `,
    });

    return { success: true, message: "Notificaciones enviadas con éxito" };
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
    return { success: false, message: "Error al enviar notificaciones" };
  }
}
