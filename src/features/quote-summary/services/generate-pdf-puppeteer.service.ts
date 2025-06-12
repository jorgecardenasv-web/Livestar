import chromium from "@sparticuz/chromium";
import puppeteerCore, {
  Browser as CoreBrowser,
  Page as CorePage,
} from "puppeteer-core";
import puppeteer, { Browser, Page } from "puppeteer";
import Handlebars from "handlebars";
import { QuotePDFData } from "../types";
import {
  CP_ICON_BASE64,
  EMMA_SVG_BASE64,
  LOGO_SVG_BASE64,
  USER_ICON_BASE64,
} from "../constants/assets-base64";
import {
  GNP_TEMPLATE_HTML,
  HDI_TEMPLATE_HTML,
} from "../constants/html-templates";

// Tipo para el browser que puede ser de puppeteer o puppeteer-core
type BrowserType = Browser | CoreBrowser;
type PageType = Page | CorePage;

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
  menoresDe45: number;
  mayoresDe45: number;
  coInsurance: string | number;
};

const processDeductibles = (data: QuotePDFData): ProcessedDeductible[] => {
  const processedDeductibles: ProcessedDeductible[] = [];

  if (!data.deductibles?.opcion_2 || !data.deductibles?.opcion_4) {
    console.warn("No se encontraron datos de deducibles completos");
    return processedDeductibles;
  }

  // Mapeo de niveles para mostrar nombres más descriptivos
  const nivelMapping: { [key: string]: string } = {
    "1": "Nivel 1 - Premium",
    "2": "Nivel 2 - Estándar",
    "3": "Nivel 3 - Básico",
  };

  try {
    for (const [nivel, valorMenores] of Object.entries(
      data.deductibles.opcion_2
    )) {
      const valorMayores = data.deductibles.opcion_4[nivel];
      if (
        typeof valorMayores === "number" &&
        typeof valorMenores === "number"
      ) {
        processedDeductibles.push({
          nivel: nivelMapping[nivel] || `Nivel ${nivel}`,
          menoresDe45: valorMenores,
          mayoresDe45: valorMayores,
          coInsurance: data.coInsurance ?? 10,
        });
      }
    }

    // Ordenar por nivel (1, 2, 3)
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

// Función para generar el template del header
const generateHeaderTemplate = (
  data: QuotePDFData,
  logoBase64: string,
  emmaLogoBase64: string
) => {
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
      height: 120px;
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
          font-size: clamp(20px, 4vw, 28px);
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
          <img src="${logoBase64}" alt="Logo ${data.company}" style="width: auto; height: 70px;" />
        </div>
      </div>
    </div>
  `;
};

export const generatePDFWithPuppeteer = async (
  data: QuotePDFData,
  format: "datauri" | "arraybuffer" = "datauri"
): Promise<string | ArrayBuffer> => {
  // Detectar si estamos en entorno de desarrollo o producción
  const isLocal = process.env.NODE_ENV === "development" || !process.env.VERCEL;

  let browser: BrowserType | null = null;

  try {
    // Procesar los deducibles usando la función existente
    const processedDeductibles = processDeductibles(data);

    // Usar las imágenes ya convertidas a base64 desde las constantes
    const logoBase64 = LOGO_SVG_BASE64;
    const emmaLogoBase64 = EMMA_SVG_BASE64;
    const userIconBase64 = USER_ICON_BASE64;
    const cpIconBase64 = CP_ICON_BASE64;

    // Preparar los datos incluyendo las imágenes en base64
    const processedData = {
      ...data,
      processedDeductibles,
      logoPath: logoBase64,
      emmaLogoPath: emmaLogoBase64,
      userIconPath: userIconBase64,
      cpIconPath: cpIconBase64,
    };

    // Seleccionar la plantilla basada en el tipo de precios
    const templateContent = data.hasDetailedPricing
      ? HDI_TEMPLATE_HTML
      : GNP_TEMPLATE_HTML;

    // Compilar la plantilla con Handlebars
    const template = Handlebars.compile(templateContent);

    // Generar el HTML con los datos
    const html = template(processedData);

    // Generar el template del header
    const headerTemplate = generateHeaderTemplate(
      data,
      logoBase64,
      emmaLogoBase64
    );

    // Configuración de argumentos para Chromium optimizada para Vercel
    const chromiumArgs = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- Esta línea puede ser clave para serverless
      "--disable-gpu",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-component-extensions-with-background-pages",
      "--hide-scrollbars",
      "--mute-audio",
      "--window-size=1280x1024",
    ];

    // Configurar Puppeteer según el entorno
    if (isLocal) {
      // Desarrollo local - usar puppeteer completo
      browser = await puppeteer.launch({
        headless: true,
        args: chromiumArgs,
        protocolTimeout: 30000,
      });
    } else {
      // Producción en Vercel - usar puppeteer-core con chromium
      browser = await puppeteerCore.launch({
        args: [...chromiumArgs, ...chromium.args],
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        protocolTimeout: 30000,
        defaultViewport: chromium.defaultViewport,
      });
    }

    const page: PageType = await browser.newPage();

    // Configurar interceptación de requests para optimizar el rendimiento
    await page.setRequestInterception(true);
    page.on("request", (request: any) => {
      const resourceType = request.resourceType();
      // Permitir solo recursos esenciales
      if (
        ["document", "script", "stylesheet", "font"].includes(resourceType) ||
        request.url().startsWith("data:") ||
        request.url().startsWith("https://fonts.googleapis.com") ||
        request.url().startsWith("https://fonts.gstatic.com")
      ) {
        request.continue();
      } else {
        request.abort();
      }
    });

    // Inyectar la fuente Montserrat
    await page.evaluateOnNewDocument(() => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    // Cargar el HTML con timeout más corto para serverless
    await page.setContent(html, {
      waitUntil: ["load", "networkidle2"], // networkidle2 es más rápido que networkidle0
      timeout: 20000, // Reducido para serverless
    });

    // Optimizaciones específicas para PDF usando el tipo genérico
    await (page as any).evaluate(() => {
      document.body.style.backgroundColor = "#f9f8f9";
      document.body.style.width = "215.9mm";
      document.body.style.minHeight = "279.4mm";
      document.body.style.margin = "0 auto";
      document.body.style.paddingTop = "120px";

      // Función optimizada para ajustes de secciones
      const sections = document.querySelectorAll(".content-section");
      const pageHeight = 279.4;
      const marginTop = 30;
      const marginBottom = 30;
      const headerHeight = 30;
      const sectionSpacing = 25;
      const effectivePageHeight =
        pageHeight - marginTop - marginBottom - headerHeight;
      let currentPageHeight = 0;

      const mainContent = document.querySelector(
        ".main-content"
      ) as HTMLElement;
      if (mainContent) {
        mainContent.style.padding = "40px 0";
        mainContent.style.marginTop = "20px";
      }

      const planInfo = document.querySelector(".plan-info") as HTMLElement;
      if (planInfo) {
        planInfo.style.marginTop = "20px";
        planInfo.style.marginBottom = "20px";
      }

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const sectionHeightMM = rect.height / 3.779528;

        element.style.marginBottom = "30px";

        if (index === 0) {
          element.style.marginTop = "30px";
          element.style.marginBottom = "40px";
        }

        if (index === 1) {
          element.style.marginTop = "30px";
          element.style.marginBottom = "50px";
        }

        if (index === 2) {
          element.style.marginTop = "40px";
          element.style.marginBottom = "40px";
          element.style.pageBreakInside = "avoid";
        }

        const willFitInPage =
          currentPageHeight + sectionHeightMM <= effectivePageHeight;
        const isFirstSection = currentPageHeight === 0;

        if (!willFitInPage && !isFirstSection) {
          element.style.pageBreakBefore = "always";
          element.style.breakBefore = "page";
          element.style.marginTop = "140px";
          currentPageHeight = sectionHeightMM;
        } else {
          currentPageHeight += sectionHeightMM + sectionSpacing;
        }
      });
    });

    // Esperar menos tiempo en serverless
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generar el PDF con configuración optimizada para serverless
    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "140px",
        bottom: "30px",
        left: "25px",
        right: "25px",
      },
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: "<div></div>",
      preferCSSPageSize: true,
      scale: 0.95,
      timeout: 30000, // Timeout específico para PDF
    });

    await browser.close();

    // Devolver el resultado en el formato solicitado
    if (format === "datauri") {
      return `data:application/pdf;base64,${Buffer.from(pdfBuffer).toString(
        "base64"
      )}`;
    }

    // Convertir el Buffer a ArrayBuffer
    const arrayBuffer = new ArrayBuffer(pdfBuffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < pdfBuffer.length; i++) {
      view[i] = pdfBuffer[i];
    }
    return arrayBuffer;
  } catch (error) {
    console.error("Error generando PDF con Puppeteer:", error);

    // Asegurar que el browser se cierre en caso de error
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
