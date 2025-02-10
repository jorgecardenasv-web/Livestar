import { useCallback } from "react";
import * as XLSX from "xlsx";
import numeral from "numeral";

export interface PriceDataHDI {
  age: number;
  monthlyPrice1: number;
  monthlyPrice2to12: number;
  annualPrice: number;
}

export type FieldType = keyof Omit<PriceDataHDI, "age">;

export const usePriceTableHDIForm = (
  prices: PriceDataHDI[],
  setPrices: (prices: PriceDataHDI[]) => void
) => {
  // Función para parsear valores numéricos (incluyendo decimales)
  const parsePrice = (value: string | number): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;

    // Usar numeral para parsear el número
    const parsed = numeral(value);
    return parsed.value() || 0;
  };

  // Función para manejar cambios en los precios
  const handlePriceChange = (
    age: number,
    field: keyof PriceDataHDI,
    value: string
  ) => {
    const updatedPrices = prices.map((price) =>
      price.age === age
        ? { ...price, [field]: parsePrice(value) } // Usar parsePrice para manejar decimales
        : price
    );
    setPrices(updatedPrices);
  };

  // Función para cargar y procesar un archivo Excel
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });

        // Buscar la hoja "Tarifas HDI"
        const sheetName = workbook.SheetNames.find((name) =>
          name.toLowerCase().includes("tarifas hdi")
        );

        if (!sheetName) {
          console.error("No se encontró la hoja 'Tarifas HDI'");
          return;
        }

        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(
          worksheet,
          {
            header: 1, // Usar la primera fila como encabezados
            raw: false, // Para obtener los valores como strings
            defval: "", // Valor por defecto para celdas vacías
          }
        );

        // Procesar los datos del archivo Excel
        const processedPrices: PriceDataHDI[] = jsonData
          .slice(2) // Ignorar las dos primeras filas (encabezados)
          .filter(
            (row): row is (string | number)[] =>
              Array.isArray(row) && typeof row[0] === "number" // Filtra solo filas con edad válida
          )
          .map((row) => ({
            age: row[0] as number, // Edad (columna A)
            monthlyPrice1: parsePrice(row[1]), // Prima Mensual 1.0 (columna B)
            monthlyPrice2to12: parsePrice(row[2]), // Prima Mensual 2-12 (columna C)
            annualPrice: parsePrice(row[3]), // PT Anual (columna D)
          }));

        console.log("Precios procesados:", processedPrices);

        setPrices(processedPrices);
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
      }
    },
    [setPrices]
  );

  return {
    prices,
    handlePriceChange,
    handleFileUpload,
  };
};
