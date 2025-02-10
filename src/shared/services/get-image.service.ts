"use server";

export interface ImageResponse {
  base64: string;
}

export async function getImage(
  base64String: string
): Promise<ImageResponse | null> {
  if (!base64String) {
    return null;
  }

  try {
    // Si ya es una data URL, devolverla tal cual
    if (base64String.startsWith("data:")) {
      return { base64: base64String };
    }

    // Si no, asumimos que es un base64 y lo devolvemos tal cual
    return { base64: base64String };
  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
}
