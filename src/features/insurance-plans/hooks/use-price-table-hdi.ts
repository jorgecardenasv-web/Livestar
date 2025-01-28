import { useCallback, useState } from "react";
import { PriceDataHDI } from "../types";

export const usePriceTableHDIForm = (
  prices: PriceDataHDI[],
  setPrices: (prices: PriceDataHDI[]) => void
) => {
  // Función para manejar cambios en los precios
  const handlePriceChange = (
    age: number,
    field: keyof PriceDataHDI,
    value: string
  ) => {
    const updatedPrices = prices.map((price) =>
      price.age === age ? { ...price, [field]: parseFloat(value) || 0 } : price
    );
    setPrices(updatedPrices);
  };

  // Función para cargar y procesar un archivo Excel
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return; // Si no hay archivo, no hacer nada

      try {
        // Importa la librería XLSX dinámicamente
        const XLSX = (await import("xlsx")).default;

        // Lee el archivo como un ArrayBuffer
        const data = await file.arrayBuffer();

        // Convierte el ArrayBuffer en un libro de trabajo de Excel
        const workbook = XLSX.read(data, { type: "array" });

        // Obtiene la primera hoja del libro de trabajo
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convierte la hoja en un array de objetos (filas)
        const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(
          worksheet,
          {
            header: 1, // Usa la primera fila como encabezados
          }
        );

        // Procesa los datos del archivo Excel
        const processedPrices: PriceDataHDI[] = jsonData
          .filter(
            (row): row is (string | number)[] =>
              Array.isArray(row) && typeof row[0] === "number" // Filtra solo filas con edad válida
          )
          .map((row) => ({
            age: row[0] as number, // Edad
            monthlyPrice1:
              row[1] !== undefined && row[1] !== "" ? Number(row[1]) : 0, // Convierte vacíos en 0
            monthlyPrice2to12:
              row[2] !== undefined && row[2] !== "" ? Number(row[2]) : 0, // Convierte vacíos en 0
            annualPrice:
              row[3] !== undefined && row[3] !== "" ? Number(row[3]) : 0, // Convierte vacíos en 0
          }));

        // Actualiza el estado con los precios procesados
        setPrices(processedPrices);
      } catch (error) {
        console.error("Error al procesar el archivo:", error); // Maneja errores
      }
    },
    []
  );

  // Retorna el estado y las funciones para ser usadas en el componente
  return {
    prices,
    handlePriceChange,
    handleFileUpload,
  };
};
