"use client";

// Esta función devuelve "Sí" o "No" en español, útil para información de depuración
export const getBooleanText = (value: boolean | null | undefined): string => {
  if (value === true) {
    return "Sí";
  } else if (value === false) {
    return "No";
  } else {
    return "No definido";
  }
};

// Esta función comprueba si un string HTML contiene contenido real o solo etiquetas vacías
export const hasRealHtmlContent = (htmlString?: string | null): boolean => {
  if (!htmlString) return false;
  
  // Elimina todas las etiquetas HTML
  const textContent = htmlString.replace(/<[^>]*>/g, '');
  
  // Elimina espacios en blanco
  const trimmedContent = textContent.trim();
  
  // Verifica si hay contenido real
  return trimmedContent.length > 0;
};
