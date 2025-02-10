import { useCallback } from "react";
import * as XLSX from "xlsx";

export interface PriceData {
  age: number;
  monthlyPriceMale: number;
  monthlyPriceFemale: number;
  annualPriceMale: number;
  annualPriceFemale: number;
}

export type FieldType = keyof Omit<PriceData, "age">;

export const usePriceTableForm = (
  prices: PriceData[],
  setPrices: (prices: PriceData[]) => void
) => {
  const handlePriceChange = (
    index: number,
    field: FieldType,
    value: string
  ) => {
    const newPrices = [...prices];
    const numericValue = value ? parseFloat(value) : 0;

    newPrices[index] = {
      ...newPrices[index],
      [field]: numericValue,
    };

    setPrices(newPrices);
  };

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(
          worksheet,
          {
            header: 1,
          }
        );

        const maxAge = jsonData.reduce(
          (max, row) =>
            Array.isArray(row) && typeof row[0] === "number"
              ? Math.max(max, row[0])
              : max,
          0
        );

        const ageMap = new Map<number, number[]>(
          jsonData
            .filter(
              (row): row is number[] =>
                Array.isArray(row) && typeof row[0] === "number"
            )
            .map((row) => [row[0], row])
        );

        const processedPrices: PriceData[] = Array.from(
          { length: maxAge + 1 },
          (_, age) => {
            const row = ageMap.get(age) || [];
            return {
              age,
              monthlyPriceMale: row[1] !== undefined ? Number(row[1]) : 0,
              monthlyPriceFemale: row[2] !== undefined ? Number(row[2]) : 0,
              annualPriceMale: row[3] !== undefined ? Number(row[3]) : 0,
              annualPriceFemale: row[4] !== undefined ? Number(row[4]) : 0,
            };
          }
        );

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
