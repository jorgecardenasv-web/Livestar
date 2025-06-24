import chromium from "@sparticuz/chromium";
import puppeteerCore, {
  Browser as CoreBrowser,
  Page as CorePage,
} from "puppeteer-core";
import puppeteer, { Browser, Page } from "puppeteer";
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
  PDF_SGM_BASE64,
} from "../constants/assets-base64";
import {
  GNP_TEMPLATE_HTML,
  HDI_TEMPLATE_HTML,
} from "../constants/html-templates";

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
  coInsuranceCap?: number;
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
        // Determinar coaseguro y tope de coaseguro para este nivel
        let coInsuranceValue = data.coInsurance ?? 10;
        let coInsuranceCapValue = data.coInsuranceCap;

        // Si hay datos de coaseguros múltiples, buscar el valor correspondiente
        if (
          coInsuranceData &&
          coInsuranceData.opcion_2 &&
          coInsuranceData.opcion_2[nivel]
        ) {
          coInsuranceValue = coInsuranceData.opcion_2[nivel];
        } else if (
          coInsuranceData &&
          coInsuranceData.opcion_4 &&
          coInsuranceData.opcion_4[nivel]
        ) {
          coInsuranceValue = coInsuranceData.opcion_4[nivel];
        }

        // Si hay datos de topes de coaseguro múltiples, buscar el valor correspondiente
        if (
          coInsuranceCapData &&
          coInsuranceCapData.opcion_2 &&
          coInsuranceCapData.opcion_2[nivel]
        ) {
          coInsuranceCapValue = coInsuranceCapData.opcion_2[nivel];
        } else if (
          coInsuranceCapData &&
          coInsuranceCapData.opcion_4 &&
          coInsuranceCapData.opcion_4[nivel]
        ) {
          coInsuranceCapValue = coInsuranceCapData.opcion_4[nivel];
        }

        processedDeductibles.push({
          nivel: nivelMapping[nivel] || `Nivel ${nivel}`,
          menoresDe45: valorMenores,
          mayoresDe45: valorMayores,
          coInsurance: coInsuranceValue,
          coInsuranceCap: coInsuranceCapValue,
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
    marginTop: 140, // Era 25, ahora 140 para cubrir los 120px del header + espacio
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
    sectionGap: Math.round(20 * spacingMultiplier),
    sectionPadding: Math.round(15 * spacingMultiplier),
    tablePadding: Math.round(12 * spacingMultiplier),
    elementSpacing: Math.round(10 * spacingMultiplier),
    multiplier: spacingMultiplier,
  };
};

// Función para unir el PDF SGM con el PDF generado por Puppeteer
const mergePDFs = async (
  puppeteerPdfBuffer: Buffer | Uint8Array
): Promise<Buffer> => {
  try {
    // Crear un nuevo documento PDF
    const mergedPdf = await PDFDocument.create();

    // Cargar el PDF SGM desde base64
    const sgmPdfBytes = Buffer.from(PDF_SGM_BASE64, "base64");
    const sgmPdf = await PDFDocument.load(sgmPdfBytes);

    // Cargar el PDF generado por Puppeteer
    const puppeteerPdf = await PDFDocument.load(puppeteerPdfBuffer);

    // Copiar todas las páginas del PDF de Puppeteer primero
    const puppeteerPages = await mergedPdf.copyPages(
      puppeteerPdf,
      puppeteerPdf.getPageIndices()
    );
    puppeteerPages.forEach((page) => mergedPdf.addPage(page));

    // Luego copiar todas las páginas del PDF SGM
    const sgmPages = await mergedPdf.copyPages(sgmPdf, sgmPdf.getPageIndices());
    sgmPages.forEach((page) => mergedPdf.addPage(page));

    // Generar el PDF final
    const mergedPdfBytes = await mergedPdf.save();
    return Buffer.from(mergedPdfBytes);
  } catch (error) {
    console.error("Error al unir los PDFs:", error);
    // En caso de error, devolver solo el PDF de Puppeteer
    return Buffer.from(puppeteerPdfBuffer);
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
      margin-bottom: 140px;
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
  const isLocal = process.env.NODE_ENV === "development" || !process.env.VERCEL;
  let browser: BrowserType | null = null;

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
      spacingConfig, // Solo una configuración unificada
    };

    // Seleccionar plantilla
    const templateContent = data.hasDetailedPricing
      ? HDI_TEMPLATE_HTML
      : GNP_TEMPLATE_HTML;

    // Compilar plantilla
    const template = Handlebars.compile(templateContent);
    const html = template(processedData);

    // Generar header
    const headerTemplate = generateHeaderTemplate(
      data,
      logoBase64,
      emmaLogoBase64
    );

    // Configuración de Chromium optimizada
    const chromiumArgs = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
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
      browser = await puppeteer.launch({
        headless: true,
        args: chromiumArgs,
        protocolTimeout: 30000,
      });
    } else {
      browser = await puppeteerCore.launch({
        args: [...chromiumArgs, ...chromium.args],
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        protocolTimeout: 30000,
        defaultViewport: chromium.defaultViewport,
      });
    }

    const page: PageType = await browser.newPage();

    // Configurar interceptación de requests
    await page.setRequestInterception(true);
    page.on("request", (request: any) => {
      const resourceType = request.resourceType();
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

    // Inyectar fuentes
    await page.evaluateOnNewDocument(() => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    // Cargar HTML
    await page.setContent(html, {
      waitUntil: ["load", "networkidle2"],
      timeout: 20000,
    });

    // Aplicar estilos optimizados con la nueva configuración
    await (page as any).evaluate((config: any) => {
      // NO aplicar paddingTop al body ya que @page lo maneja
      document.body.style.width = "215.9mm";
      document.body.style.minHeight = "279.4mm";
      document.body.style.margin = "0 auto";
      // Eliminar esta línea: document.body.style.paddingTop = `${config.headerHeight}px`;

      // Para la primera página, aplicar margen al primer elemento
      const firstSection = document.querySelector(".plan-info") as HTMLElement;
      if (firstSection) {
        firstSection.style.marginTop = "20px";
      }

      // Aplicar espaciado a las secciones
      const sections = document.querySelectorAll(".content-section");
      sections.forEach((section, index) => {
        const element = section as HTMLElement;

        // Espaciado normal entre secciones
        element.style.marginBottom = `${config.sectionGap}px`;
        element.style.padding = `${config.sectionPadding}px`;

        // Asegurar que las secciones no se corten
        element.style.pageBreakInside = "avoid";
        element.style.breakInside = "avoid";

        // Para secciones que podrían quedar en la parte superior de una nueva página
        if (index > 0) {
          // Agregar un margen superior condicional que solo aplique después de saltos
          element.style.pageBreakBefore = "auto";
          // CSS ya maneja el espaciado con @page
        }
      });

      // Ajustar contenido principal
      const mainContent = document.querySelector(
        ".main-content"
      ) as HTMLElement;
      if (mainContent) {
        mainContent.style.gap = `${config.elementSpacing}px`;
        mainContent.style.padding = `${config.sectionPadding}px 0`;
      }

      // Ajustar información del plan
      const planInfo = document.querySelector(".plan-info") as HTMLElement;
      if (planInfo) {
        planInfo.style.marginTop = `${config.elementSpacing}px`;
        planInfo.style.marginBottom = `${config.elementSpacing}px`;
      }

      // Ajustar tablas para mejor legibilidad
      const tables = document.querySelectorAll(".data-table");
      tables.forEach((table) => {
        const tableElement = table as HTMLElement;
        tableElement.style.fontSize = config.multiplier >= 1 ? "16px" : "14px";

        const cells = table.querySelectorAll("td, th");
        cells.forEach((cell) => {
          const cellElement = cell as HTMLElement;
          cellElement.style.padding = `${config.tablePadding}px`;
        });
      });

      // Ajustar elementos de cobertura
      const coverageItems = document.querySelectorAll(".coverage-item");
      coverageItems.forEach((item) => {
        const itemElement = item as HTMLElement;
        itemElement.style.padding = `${config.tablePadding}px`;
      });

      console.log(
        `Aplicada configuración de espaciado: multiplicador ${config.multiplier}`
      );
    }, spacingConfig);

    // Pequeña pausa para asegurar que los estilos se apliquen
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generar PDF con configuración optimizada
    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "140px",
        bottom: "40px",
        left: "25px",
        right: "25px",
      },
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: "<div></div>",
      preferCSSPageSize: false,
      scale: 0.95,
      timeout: 30000,
    });

    await browser.close();

    // Unir el PDF SGM con el PDF generado por Puppeteer
    const mergedPdfBuffer = await mergePDFs(Buffer.from(pdfBuffer));

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
    console.error("Error generando PDF con Puppeteer:", error);

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
