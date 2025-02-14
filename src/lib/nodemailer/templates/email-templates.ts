const currentYear = new Date().getFullYear();

export const prospectoTemplate = ({
  prospectName,
  logoUrl,
}: {
  prospectName: string;
  logoUrl: string;
}) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización Preliminar de Seguro</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <!-- Wrapper for email width -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 10px;">
        <!-- Main content container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          <!-- Logo section -->
          <tr>
            <td align="center" style="padding: 20px 20px 30px 20px;">
              <img src="${logoUrl}" alt="Logo Aseguradora" style="max-width: 180px; height: auto;">
            </td>
          </tr>

          <!-- Content section -->
          <tr>
            <td style="padding: 20px 30px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 28px; font-weight: bold;">
                      Cotización Preliminar
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Estimado/a <strong>${prospectName}</strong>,
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Agradecemos su interés en nuestros servicios de seguros de gastos médicos. Basándonos en la información proporcionada, hemos preparado una cotización preliminar para usted.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Por favor, tenga en cuenta que los valores presentados son aproximados y están sujetos a revisión por parte de un asesor especializado.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Un asesor de nuestro equipo se pondrá en contacto con usted en breve para revisar los detalles y confirmar la información necesaria para ofrecerle una cotización final adaptada a sus necesidades específicas.
                    </p>
                  </td>
                </tr>

                <!-- Contact box 
                  <tr>
                    <td style="padding: 25px; background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0 0 15px 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                              Si tiene alguna pregunta o desea adelantar el contacto, no dude en comunicarse con nosotros al:
                            </p>
                            <p style="margin: 0; color: #0066cc; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold;">
                              ${""}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                -->
                <tr>
                  <td style="padding-top: 25px;">
                    <p style="margin: 0 0 20px 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Le agradecemos la confianza depositada en nosotros para ayudarle a cuidar su tranquilidad y bienestar.
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Atentamente,<br>
                      <strong>El equipo de Livestar</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer section -->
          <tr>
            <td style="padding: 20px; background-color: #f8f9fa; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #666666; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">
                Este es un correo automático. Por favor no responda directamente a esta dirección.
              </p>
              <p style="margin: 0; color: #666666; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">
                © ${currentYear} Livestar. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const advisorTemplate = ({
  advisorName,
  prospectName,
  prospectEmail,
  selectedPlan,
  dateOfQuote,
  prospectWhatsApp,
}: {
  advisorName: string;
  prospectName: string;
  prospectEmail: string;
  selectedPlan: string;
  dateOfQuote: string;
  prospectWhatsApp: string;
}) => {
  const formatMexicanPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Check if it's a 10-digit number
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    // Return original if not 10 digits
    return phone;
  };

  const formattedWhatsApp = formatMexicanPhoneNumber(prospectWhatsApp);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notificación de Cotización</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <!-- Wrapper for email width -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 10px;">
        <!-- Main content container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          <!-- Content section -->
          <tr>
            <td style="padding: 20px 30px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 28px; font-weight: bold;">
                      Nueva Cotización Preliminar
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Hola <strong>${advisorName}</strong>,
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Te informamos que un prospecto ha generado una cotización preliminar en la plataforma. Es necesario revisar los detalles con el prospecto para proporcionar una cotización definitiva.
                    </p>
                  </td>
                </tr>

                <!-- Prospect Details Box -->
                <tr>
                  <td style="padding: 25px; background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <h2 style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold;">
                            Detalles del Prospecto:
                          </h2>
                        </td>
                      </tr>
                      
                      <!-- Name -->
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="width: 120px; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                Nombre:
                              </td>
                              <td style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold;">
                                ${prospectName}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="width: 120px; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                Correo:
                              </td>
                              <td style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold;">
                                ${prospectEmail}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- WhatsApp (New Field) -->
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="width: 120px; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                WhatsApp:
                              </td>
                              <td style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold;">
                                ${formattedWhatsApp}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Plan -->
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="width: 120px; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                Cotización:
                              </td>
                              <td style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold;">
                                ${selectedPlan}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Date -->
                      <tr>
                        <td>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="width: 120px; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                Fecha:
                              </td>
                              <td style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold;">
                                ${dateOfQuote}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 25px;">
                    <p style="margin: 0 0 20px 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Por favor, contacta al prospecto para verificar la información y ajustar la cotización según corresponda.
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                      Gracias por tu atención y esfuerzo para brindar el mejor servicio.<br><br>
                      Saludos,<br>
                      <strong>El equipo de Livestar</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer section -->
          <tr>
            <td style="padding: 20px; background-color: #f8f9fa; text-align: center;">
              <p style="margin: 0; color: #666666; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">
                © ${currentYear} Livestar. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
