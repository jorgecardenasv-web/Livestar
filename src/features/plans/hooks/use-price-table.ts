import { useCallback } from "react";
import * as XLSX from "xlsx";
import numeral from "numeral";

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
  const parsePrice = (value: string | number): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;

    const parsed = numeral(value);
    return parsed.value() || 0;
  };

  const handlePriceChange = (
    index: number,
    field: FieldType,
    value: string
  ) => {
    const newPrices = [...prices];
    const numericValue = value ? parsePrice(value) : 0;

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

        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
          header: 1,
          raw: false,
          defval: "",
        });

        const dataRows = jsonData.filter(
          (row) => row.length >= 5 && !isNaN(Number(row[0])) && row[0] !== ""
        );

        const processedPrices: PriceData[] = dataRows.map((row) => ({
          age: parseInt(row[0]),
          monthlyPriceMale: parsePrice(row[1]),
          monthlyPriceFemale: parsePrice(row[2]),
          annualPriceMale: parsePrice(row[3]),
          annualPriceFemale: parsePrice(row[4]),
        }));

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
