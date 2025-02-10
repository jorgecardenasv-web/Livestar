export const convertToBlob = async (file: File): Promise<string> => {
  try {
    // Si es SVG, manejarlo como texto
    if (file.type === "image/svg+xml") {
      const text = await file.text();
      return `data:${file.type};base64,${Buffer.from(text).toString("base64")}`;
    }

    // Para otros tipos de imágenes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error("Error al convertir imagen:", error);
    throw new Error("Error al procesar la imagen");
  }
};
