import { Quote } from "@prisma/client";

export const prospectoTemplate = ({
  prospectName,
  insuranceName,
  planName,
  quotes,
  totalPrice,
  contactNumber,
  logoUrl
}: {
  prospectName: string;
  insuranceName: string;
  planName: string;
  quotes: Quote[];
  totalPrice: number;
  contactNumber: string;
  logoUrl: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      padding: 20px;
    }
    .logo {
      max-width: 200px;
      height: auto;
    }
    .cotizacion {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .plan {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .total {
      font-weight: bold;
      text-align: right;
      padding: 15px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${logoUrl}" alt="Logo Aseguradora" class="logo">
  </div>

  <p>Estimado/a ${prospectName},</p>
  
  <p>¡Gracias por utilizar nuestra plataforma para explorar opciones de seguros de gastos médicos mayores! Basándonos en la información proporcionada, hemos preparado una cotización preliminar para ti. Por favor, ten en cuenta que los valores presentados son aproximados y están sujetos a revisión por parte de un asesor especializado.</p>

  <div class="cotizacion">
    <h3>${insuranceName}</h3>
    <h4>${planName}</h4>
    ${quotes.map(quote => `
      <div class="plan">
        <span>${quote.planId}</span>
        <span>$${quote.totalPrice.toLocaleString('es-MX')}</span>
      </div>
    `).join('')}
    <div class="total">
      Total Aproximado: $${totalPrice.toLocaleString('es-MX')}
    </div>
  </div>

  <p>Un asesor de nuestro equipo se pondrá en contacto contigo en breve para revisar los detalles y confirmar la información necesaria para ofrecerte una cotización final adaptada a tus necesidades.</p>

  <p>Si tienes alguna pregunta o deseas adelantar el contacto, no dudes en responder este correo o llamarnos al ${contactNumber}.</p>

  <p>Gracias por permitirnos ayudarte a cuidar tu tranquilidad y bienestar.</p>

  <p>Saludos cordiales,<br>El equipo de Livestar</p>

  <div class="footer">
    Este es un correo automático. Por favor no responder directamente a esta dirección.
  </div>
</body>
</html>
`;

export const advisorTemplate = ({
  advisorName,
  prospectName,
  prospectEmail,
  selectedPlan,
  dateOfQuote
}: {
  advisorName: string;
  prospectName: string;
  prospectEmail: string;
  selectedPlan: string;
  dateOfQuote: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .detalles {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .detalle-item {
      margin: 10px 0;
    }
    .label {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <p>Hola ${advisorName},</p>

  <p>Te informamos que un prospecto ha generado una cotización preliminar en la plataforma. Es necesario revisar los detalles con el prospecto para proporcionar una cotización definitiva.</p>

  <div class="detalles">
    <h3>Detalles del Prospecto:</h3>
    <div class="detalle-item">
      <span class="label">Nombre:</span> ${prospectName}
    </div>
    <div class="detalle-item">
      <span class="label">Correo electrónico:</span> ${prospectEmail}
    </div>
    <div class="detalle-item">
      <span class="label">Cotización preliminar:</span> ${selectedPlan}
    </div>
    <div class="detalle-item">
      <span class="label">Fecha de cotización:</span> ${dateOfQuote}
    </div>
  </div>

  <p>Por favor, contacta al prospecto para verificar la información y ajustar la cotización según corresponda.</p>

  <p>Gracias por tu atención y esfuerzo para brindar el mejor servicio.</p>

  <p>Saludos,<br>El equipo de Livestar</p>
</body>
</html>
`;