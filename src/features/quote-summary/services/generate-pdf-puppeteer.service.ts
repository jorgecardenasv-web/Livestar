import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { QuotePDFData } from "../types";
import {
  CP_ICON_BASE64,
  EMMA_SVG_BASE64,
  LOGO_SVG_BASE64,
  USER_ICON_BASE64,
} from "../constants/assets-base64";

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

// Función para obtener la ruta absoluta de las imágenes
const getImagePath = (imageName: string) => {
  return path.join(process.cwd(), "public", imageName);
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
  try {
    // Procesar los deducibles usando la función existente
    const processedDeductibles = processDeductibles(data);

    // Leer y convertir las imágenes a base64
    const logoBuffer = await fs.readFile(getImagePath("logo.svg"));
    const emmaLogoBuffer = await fs.readFile(getImagePath("emma.svg"));
    const userIcon = await fs.readFile(getImagePath("user-icon.svg"));
    const cpIcon = await fs.readFile(getImagePath("cp.svg"));

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
    const templatePath = path.join(
      process.cwd(),
      `src/features/quote-summary/template/plantilla-${data.hasDetailedPricing ? "hdi" : "gnp"}.html`
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");

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

    // 4. Generar el PDF usando Puppeteer con configuración optimizada
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1280x1024",
      ],
      protocolTimeout: 30000,
    });

    const page = await browser.newPage();

    // Agregar fuente Monserrat de Google Fonts
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font"].includes(request.resourceType()) ||
        request.url().startsWith("https://fonts.googleapis.com") ||
        request.url().startsWith("https://fonts.gstatic.com")
      ) {
        request.continue();
      } else {
        request.continue();
      }
    });

    // Inyectar la fuente Monserrat
    await page.evaluateOnNewDocument(() => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });

    // Cargar el HTML
    await page.setContent(html, {
      waitUntil: ["load", "networkidle0"],
      timeout: 30000,
    });

    // Verificar que las imágenes y fuentes se cargaron correctamente
    const recursos = await page.evaluate(() => {
      const imgs = document.getElementsByTagName("img");
      const fonts = document.fonts;
      return {
        imagenes: Array.from(imgs).map((img) => ({
          src: img.src,
          cargada: img.complete && img.naturalHeight !== 0,
        })),
        fuentesCargadas: Array.from(document.styleSheets)
          .filter((sheet) => sheet.href?.includes("fonts.googleapis.com"))
          .map((sheet) => sheet.href),
      };
    });

    // Establecer color de fondo para toda la página y ajustar el margen superior
    await page.evaluate(() => {
      document.body.style.backgroundColor = "#f9f8f9";
      document.body.style.width = "215.9mm";
      document.body.style.minHeight = "279.4mm";
      document.body.style.margin = "0 auto";

      // AJUSTE CRÍTICO: Agregar margen superior para evitar superposición con el header
      document.body.style.paddingTop = "120px"; // Espacio para el header

      // Función para verificar la altura de las secciones y ajustar los saltos de página
      const checkSectionHeights = () => {
        const sections = document.querySelectorAll(".content-section");
        const pageHeight = 279.4; // altura de página Letter en mm
        const marginTop = 30; // margen superior
        const marginBottom = 30; // margen inferior
        const headerHeight = 30; // altura aproximada del header en mm
        const sectionSpacing = 25; // espacio entre secciones
        const effectivePageHeight =
          pageHeight - marginTop - marginBottom - headerHeight;
        let currentPageHeight = 0;
        let lastSectionWasLarge = false;

        // Asegurar que el contenedor principal tenga padding ajustado para el header
        const mainContent = document.querySelector(
          ".main-content"
        ) as HTMLElement;
        if (mainContent) {
          mainContent.style.padding = "40px 0"; // Aumentado para dar más espacio
          mainContent.style.marginTop = "20px"; // Margen adicional desde el header
        }

        // Ajustar la sección de información del plan
        const planInfo = document.querySelector(".plan-info") as HTMLElement;
        if (planInfo) {
          planInfo.style.marginTop = "20px"; // Espacio desde el header
          planInfo.style.marginBottom = "20px";
        }

        sections.forEach((section, index) => {
          const element = section as HTMLElement;
          const sectionHeight = element.getBoundingClientRect().height;
          const sectionHeightMM = sectionHeight / 3.779528; // Convertir px a mm

          // Espaciado base para todas las secciones
          element.style.marginBottom = "30px";

          // Ajustes específicos por sección
          if (index === 0) {
            // PERSONAS A PROTEGER
            element.style.marginTop = "30px"; // Aumentado desde 20px
            element.style.marginBottom = "40px";
          }

          if (index === 1) {
            // RESUMEN DE COSTOS
            element.style.marginTop = "30px";
            element.style.marginBottom = "50px";
          }

          // COBERTURAS PRINCIPALES
          if (index === 2) {
            element.style.marginTop = "40px";
            element.style.marginBottom = "40px";
            element.style.pageBreakInside = "avoid";
          }

          // Calcular si la sección cabe en la página actual
          const willFitInPage =
            currentPageHeight + sectionHeightMM <= effectivePageHeight;
          const isFirstSection = currentPageHeight === 0;
          const isLargeSection = sectionHeightMM > effectivePageHeight * 0.6;

          // Reglas de salto de página
          if (!willFitInPage && !isFirstSection) {
            element.style.pageBreakBefore = "always";
            element.style.breakBefore = "page";
            element.style.marginTop = "140px"; // Espacio para el header en nueva página
            currentPageHeight = sectionHeightMM;
          } else {
            // Si la sección anterior era grande, agregar más espacio
            if (lastSectionWasLarge) {
              element.style.marginTop = "40px";
            }
            currentPageHeight += sectionHeightMM + sectionSpacing;
          }

          lastSectionWasLarge = isLargeSection;
        });
      };

      // Ejecutar la verificación después de que todo el contenido esté cargado
      checkSectionHeights();
    });

    // Esperar a que se apliquen los ajustes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generar el PDF con header personalizado
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
    throw error;
  }
};
