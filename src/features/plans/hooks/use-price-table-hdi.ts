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
  const parsePrice = (value: string | number): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;

    const parsed = numeral(value);
    return parsed.value() || 0;
  };

  const handlePriceChange = (
    age: number,
    field: keyof PriceDataHDI,
    value: string
  ) => {
    const updatedPrices = prices.map((price) =>
      price.age === age ? { ...price, [field]: parsePrice(value) } : price
    );
    setPrices(updatedPrices);
  };

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName =
          workbook.SheetNames.find((name) =>
            name.toLowerCase().includes("tarifas hdi")
          ) || workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, {
          header: 1,
          raw: true,
          defval: null,
        });

        const startRow = jsonData.findIndex((row: any[]) => {
          return (
            row?.length >= 4 &&
            row.some(
              (cell) =>
                (typeof cell === "number" && !isNaN(cell)) ||
                (typeof cell === "string" && !isNaN(Number(cell)))
            )
          );
        });

        const pricesMap = new Map<number, PriceDataHDI>();

        jsonData.slice(startRow).forEach((row: any[]) => {
          if (!Array.isArray(row) || row.length < 4) return;

          const age = Number(row[0]);
          const monthlyPrice1 = parsePrice(row[1]);
          const monthlyPrice2to12 = parsePrice(row[2]);
          const annualPrice = parsePrice(row[3]);

          // Validación más estricta de los datos
          if (
            !isNaN(age) &&
            age >= 0 &&
            age <= 120 &&
            (monthlyPrice1 > 0 || monthlyPrice2to12 > 0 || annualPrice > 0)
          ) {
            pricesMap.set(age, {
              age,
              monthlyPrice1,
              monthlyPrice2to12,
              annualPrice,
            });
          }
        });

        const processedPrices = Array.from(pricesMap.values()).sort(
          (a, b) => a.age - b.age
        );

        if (processedPrices.length === 0) {
          console.error("No se encontraron datos válidos en el archivo");
          return;
        }

        setPrices(processedPrices);
      } catch (error) {
        console.error("Error detallado al procesar el archivo:", error);
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
