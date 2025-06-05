import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { QuotePDFData } from "../types";

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

    const logoBase64 = `data:image/svg+xml;base64,${logoBuffer.toString("base64")}`;
    const emmaLogoBase64 = `data:image/svg+xml;base64,${emmaLogoBuffer.toString("base64")}`;
    const userIconBase64 = `data:image/svg+xml;base64,${userIcon.toString("base64")}`;
    const cpIconBase64 = `data:image/svg+xml;base64,${cpIcon.toString("base64")}`;

    // Preparar los datos incluyendo las imágenes en base64
    const processedData = {
      ...data,
      processedDeductibles,
      logoPath: logoBase64,
      emmaLogoPath: emmaLogoBase64,
      userIconPath: userIconBase64,
      cpIconPath: cpIconBase64,
    };

    // Leer la plantilla HTML
    const templatePath = path.join(
      process.cwd(),
      "src/features/quote-summary/template/plantilla-gnp.html"
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");

    // Compilar la plantilla con Handlebars
    const template = Handlebars.compile(templateContent);

    // Generar el HTML con los datos
    const html = template(processedData);

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

    // Establecer color de fondo para toda la página
    await page.evaluate(() => {
      document.body.style.backgroundColor = "#f9f8f9";
      document.body.style.width = "215.9mm";
      document.body.style.minHeight = "279.4mm";
      document.body.style.margin = "0 auto";

      // Función para verificar la altura de las secciones y ajustar los saltos de página
      const checkSectionHeights = () => {
        const sections = document.querySelectorAll(".content-section");
        const pageHeight = 279.4; // altura de página Letter en mm
        const marginTop = 30; // margen superior aumentado
        const marginBottom = 30; // margen inferior aumentado
        const sectionSpacing = 25; // espacio entre secciones aumentado
        const effectivePageHeight = pageHeight - marginTop - marginBottom;
        let currentPageHeight = 0;
        let lastSectionWasLarge = false;

        // Asegurar que el contenedor principal tenga padding
        const mainContent = document.querySelector(
          ".main-content"
        ) as HTMLElement;
        if (mainContent) {
          mainContent.style.padding = "20px 0";
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
            element.style.marginTop = "20px";
            element.style.marginBottom = "40px";
          }

          if (index === 1) {
            // RESUMEN DE COSTOS
            element.style.marginTop = "30px";
            element.style.marginBottom = "50px"; // Aumentado para dar más espacio
          }

          // COBERTURAS PRINCIPALES
          if (index === 2) {
            element.style.marginTop = "40px"; // Más espacio antes
            element.style.marginBottom = "40px";
            element.style.pageBreakInside = "avoid"; // Evitar corte
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
            element.style.marginTop = "30px";
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

    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "30px",
        bottom: "30px",
        left: "25px",
        right: "25px",
      },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: "<div></div>",
      preferCSSPageSize: true,
      scale: 0.95, // Reducción de escala un poco mayor para asegurar mejor distribución
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
