import { chromium, Route } from "playwright";
import Handlebars from "handlebars";
import { PDFDocument } from "pdf-lib";
import { QuotePDFData } from "../types";
import {
  CP_ICON_BASE64,
  EMMA_SVG_BASE64,
  LOGO_SVG_BASE64,
  USER_ICON_BASE64,
  MONEY_ICON_BASE64,
  CHECK_ICON_BASE64,
  MEDICAL_ICON_BASE64,
  PDF_SGM_GNP_BASE64,
  PDF_SGM_HDI_BASE64,
} from "../constants/assets-base64";
import {
  GNP_ANNUAL_TEMPLATE_HTML,
  GNP_MONTHLY_TEMPLATE_HTML,
  HDI_TEMPLATE_HTML,
} from "../constants/html-templates";

// Registrar los helpers de Handlebars
Handlebars.registerHelper("formatCurrency", function (amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
});

Handlebars.registerHelper("multiply", function (a: number, b: number) {
  return a * b;
});

type ProcessedDeductible = {
  nivel: string;
  deductibleUnder45: number;
  deductibleOver45: number;
  coInsuranceUnder45: string | number;
  coInsuranceCapUnder45?: number;
  coInsuranceOver45: string | number;
  coInsuranceCapOver45?: number;
};

const processDeductibles = (data: QuotePDFData): ProcessedDeductible[] => {
  const processedDeductibles: ProcessedDeductible[] = [];

  if (!data.deductibles?.opcion_2 || !data.deductibles?.opcion_4) {
    console.warn("No se encontraron datos de deducibles completos");
    return processedDeductibles;
  }

  const nivelMapping: { [key: string]: string } = {
    A: "Nivel A",
    B: "Nivel B",
    C: "Nivel C",
    D: "Nivel D",
  };

  // Procesar coaseguros múltiples si existen
  let coInsuranceData = data.coInsuranceData;
  let coInsuranceCapData = data.coInsuranceCapData;

  try {
    for (const [nivel, valorMenores] of Object.entries(
      data.deductibles.opcion_2
    )) {
      const valorMayores = data.deductibles.opcion_4[nivel];
      if (
        typeof valorMayores === "number" &&
        typeof valorMenores === "number"
      ) {
        // Determinar coaseguro y tope de coaseguro para menores de 45 (opcion_2)
        let coInsuranceUnder45 = data.coInsurance ?? 10;
        let coInsuranceCapUnder45 = data.coInsuranceCap;

        // Determinar coaseguro y tope de coaseguro para mayores de 45 (opcion_4)
        let coInsuranceOver45 = data.coInsurance ?? 10;
        let coInsuranceCapOver45 = data.coInsuranceCap;

        // Si hay datos de coaseguros múltiples para menores de 45 (opcion_2)
        if (
          coInsuranceData &&
          coInsuranceData.opcion_2 &&
          coInsuranceData.opcion_2[nivel]
        ) {
          coInsuranceUnder45 = coInsuranceData.opcion_2[nivel];
        }

        // Si hay datos de coaseguros múltiples para mayores de 45 (opcion_4)
        if (
          coInsuranceData &&
          coInsuranceData.opcion_4 &&
          coInsuranceData.opcion_4[nivel]
        ) {
          coInsuranceOver45 = coInsuranceData.opcion_4[nivel];
        }

        // Si hay datos de topes de coaseguro múltiples para menores de 45 (opcion_2)
        if (
          coInsuranceCapData &&
          coInsuranceCapData.opcion_2 &&
          coInsuranceCapData.opcion_2[nivel]
        ) {
          coInsuranceCapUnder45 = coInsuranceCapData.opcion_2[nivel];
        }

        // Si hay datos de topes de coaseguro múltiples para mayores de 45 (opcion_4)
        if (
          coInsuranceCapData &&
          coInsuranceCapData.opcion_4 &&
          coInsuranceCapData.opcion_4[nivel]
        ) {
          coInsuranceCapOver45 = coInsuranceCapData.opcion_4[nivel];
        }

        processedDeductibles.push({
          nivel: nivelMapping[nivel] || `Nivel ${nivel}`,
          deductibleUnder45: valorMenores,
          deductibleOver45: valorMayores,
          coInsuranceUnder45: coInsuranceUnder45,
          coInsuranceCapUnder45: coInsuranceCapUnder45,
          coInsuranceOver45: coInsuranceOver45,
          coInsuranceCapOver45: coInsuranceCapOver45,
        });
      }
    }

    return processedDeductibles.sort((a, b) => {
      const nivelA = parseInt(a.nivel.split(" ")[1]);
      const nivelB = parseInt(b.nivel.split(" ")[1]);
      return nivelA - nivelB;
    });
  } catch (error) {
    console.error("Error al procesar los deducibles:", error);
    return processedDeductibles;
  }
};

// Sistema de espaciado simplificado y más robusto
const calculateSpacingConfig = (
  membersCount: number,
  isDetailedPricing: boolean = false
) => {
  // Configuración base
  const baseConfig = {
    headerHeight: 120,
    // Aumentar margen superior para dar espacio al header en todas las páginas
    marginTop: 120,
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  };

  // Espaciado según cantidad de miembros
  let spacingMultiplier = 1;
  if (membersCount <= 2) {
    spacingMultiplier = 1.2;
  } else if (membersCount <= 4) {
    spacingMultiplier = 1.0;
  } else {
    spacingMultiplier = 0.8;
  }

  if (isDetailedPricing) {
    spacingMultiplier *= 0.9;
  }
  return {
    ...baseConfig,
    sectionGap: Math.round(10 * spacingMultiplier),
    sectionPadding: Math.round(12 * spacingMultiplier),
    tablePadding: Math.round(10 * spacingMultiplier),
    elementSpacing: Math.round(10 * spacingMultiplier),
    multiplier: spacingMultiplier,
  };
};

// Función para generar el header del PDF
const generateHeaderTemplate = (data: QuotePDFData, logoBase64: string) => {
  return `
    <div style="
      background-color: #1e3c72 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color: #ffffff;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
      font-size: 11px;
      margin: 0;
      height: 100px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
      ">
        <div style="
          font-size: 24px;
          font-weight: bold;
          line-height: 1.2;
          max-width: 500px;
        ">
          COTIZACIÓN DE SEGURO<br />DE GASTOS MÉDICOS
        </div>
        <div style="
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        ">
          <img src="${logoBase64}" alt="Logo ${data.company}" style="width: auto; height: 50px;" />
        </div>
      </div>
    </div>
  `;
};

// Función para generar el footer del PDF
const generateFooterTemplate = () => {
  return `
    <div style="
      background-color: #f5f5f5 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color: #666666;
      padding: 8px 30px;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
      font-size: 12px;
      margin: 0;
      text-align: center;
      line-height: 1.3;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    ">
      Este documento es únicamente informativo y no constituye una póliza de seguro. Los términos y condiciones específicos están sujetos a la póliza emitida por la aseguradora.
    </div>
  `;
};

// Función para unir el PDF SGM con el PDF generado por Playwright
const mergePDFs = async (
  playwrightPdfBuffer: Buffer | Uint8Array,
  isDetailedPricing: boolean = false
): Promise<Buffer> => {
  try {
    const mergedPdf = await PDFDocument.create();

    // Cargar el PDF generado por Playwright
    const playwrightPdf = await PDFDocument.load(playwrightPdfBuffer);

    // Copiar todas las páginas del PDF de Playwright primero
    const playwrightPages = await mergedPdf.copyPages(
      playwrightPdf,
      playwrightPdf.getPageIndices()
    );
    playwrightPages.forEach((page) => mergedPdf.addPage(page));

    // Cargar el PDF SGM correspondiente
    const sgmBase64 = isDetailedPricing ? PDF_SGM_HDI_BASE64 : PDF_SGM_GNP_BASE64;
    const sgmPdfData = Uint8Array.from(atob(sgmBase64), (c) => c.charCodeAt(0));
    const sgmPdf = await PDFDocument.load(sgmPdfData);

    // Copiar páginas del PDF SGM
    const sgmPages = await mergedPdf.copyPages(sgmPdf, sgmPdf.getPageIndices());
    sgmPages.forEach((page) => mergedPdf.addPage(page));

    return Buffer.from(await mergedPdf.save());
  } catch (error) {
    console.error("Error al unir los PDFs:", error);
    // En caso de error, devolver solo el PDF de Playwright
    return Buffer.from(playwrightPdfBuffer);
  }
};

export const generatePDFWithPlaywright = async (
  data: QuotePDFData,
  format: "datauri" | "arraybuffer" = "datauri"
): Promise<string | ArrayBuffer> => {
  let browser = null;

  try {
    const processedDeductibles = processDeductibles(data);
    const membersCount = data.members?.length || 0;
    const spacingConfig = calculateSpacingConfig(
      membersCount,
      data.hasDetailedPricing
    );

    // Preparar assets
    const logoBase64 = LOGO_SVG_BASE64;
    const emmaLogoBase64 = EMMA_SVG_BASE64;
    const userIconBase64 = USER_ICON_BASE64;
    const cpIconBase64 = CP_ICON_BASE64;
    const moneyIconBase64 = MONEY_ICON_BASE64;
    const checkIconBase64 = CHECK_ICON_BASE64;
    const medicalIconBase64 = MEDICAL_ICON_BASE64;

    // Preparar datos con configuración de espaciado simplificada
    const processedData = {
      ...data,
      processedDeductibles,
      logoPath: logoBase64,
      emmaLogoPath: emmaLogoBase64,
      userIconPath: userIconBase64,
      cpIconPath: cpIconBase64,
      moneyIconPath: moneyIconBase64,
      checkIconPath: checkIconBase64,
      medicalIconPath: medicalIconBase64,
      spacingConfig,
    };

    let templateContent: string;

    if (data.hasDetailedPricing) {
      templateContent = HDI_TEMPLATE_HTML;
    } else {
      if (data.paymentType === "Mensual") {
        templateContent = GNP_MONTHLY_TEMPLATE_HTML;
      } else {
        templateContent = GNP_ANNUAL_TEMPLATE_HTML;
      }
    }

    // Compilar plantilla
    const template = Handlebars.compile(templateContent);
    const html = template(processedData);

    // Generar header y footer
    const headerTemplate = generateHeaderTemplate(data, logoBase64);
    const footerTemplate = generateFooterTemplate();

    // Lanzar navegador con Playwright
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-extensions",
        "--no-first-run",
        "--no-zygote",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-sync",
        "--disable-translate",
        "--hide-scrollbars",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-default-browser-check",
        "--safebrowsing-disable-auto-update",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-ipc-flooding-protection",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Configurar interceptación de requests
    await page.route("**/*", (route: Route) => {
      const request = route.request();
      const resourceType = request.resourceType();
      const allowedResources = new Set([
        "document",
        "stylesheet",
        "font",
        "script",
      ]);

      if (
        allowedResources.has(resourceType) ||
        request.url().startsWith("data:")
      ) {
        route.continue();
      } else {
        route.abort();
      }
    });

    // Inyectar fuentes ANTES de cargar el contenido
    await page.addInitScript(() => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    // Cargar HTML
    await page.setContent(html, {
      waitUntil: "load",
      timeout: 20000,
    });

    // Esperar a que las fuentes se carguen
    await page.waitForLoadState("networkidle", { timeout: 20000 });

    // Pequeña pausa para asegurar que los estilos se apliquen
    await page.waitForTimeout(300);

    // Generar PDF con configuración optimizada (exactamente como Puppeteer)
    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "100px",
        bottom: "30px",
        left: "25px",
        right: "25px",
      },
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      preferCSSPageSize: false,
      scale: 0.95,
    });

    await browser.close();

    // Unir el PDF SGM con el PDF generado por Playwright
    const mergedPdfBuffer = await mergePDFs(
      Buffer.from(pdfBuffer),
      data.hasDetailedPricing
    );

    // Devolver resultado
    if (format === "datauri") {
      return `data:application/pdf;base64,${Buffer.from(
        mergedPdfBuffer
      ).toString("base64")}`;
    }

    const arrayBuffer = new ArrayBuffer(mergedPdfBuffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < mergedPdfBuffer.length; i++) {
      view[i] = mergedPdfBuffer[i];
    }
    return arrayBuffer;
  } catch (error) {
    console.error("Error generando PDF con Playwright:", error);

    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error cerrando browser:", closeError);
      }
    }

    throw error;
  }
};
