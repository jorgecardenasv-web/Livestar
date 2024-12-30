import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { randomBytes } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "src", "assets", "images");

const generateUniqueFilename = (originalFilename: string): string => {
  const uniqueId = randomBytes(8).toString("hex");
  const extension = path.extname(originalFilename);
  return `${uniqueId}${extension}`;
};

export const saveImage = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const filename = generateUniqueFilename(file.name);

    await mkdir(UPLOAD_DIR, { recursive: true });

    const filePath = path.join(UPLOAD_DIR, filename);

    await writeFile(filePath, buffer);

    return filename;
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    throw new Error("No se pudo guardar la imagen");
  }
};
