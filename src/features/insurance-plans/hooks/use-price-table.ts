import { useCallback } from "react";
import { useInsurancePlanStore } from "../store/insurance-plan-store";

export interface PriceData {
  age: number;
  monthlyPriceMale: number;
  monthlyPriceFemale: number;
  annualPriceMale: number;
  annualPriceFemale: number;
}

export type FieldType = keyof Omit<PriceData, "age">;

const MONTHS_IN_YEAR = 12;
const DECIMAL_PLACES = 2;

export const usePriceTable = () => {
  const { prices, setPrices } = useInsurancePlanStore();

  const calculateMonthly = useCallback((annual: string): number => {
    const value = parseFloat(annual);
    return isNaN(value) ? 0 : value / MONTHS_IN_YEAR;
  }, []);

  const calculateAnnual = useCallback((monthly: string): number => {
    const value = parseFloat(monthly);
    return isNaN(value) ? 0 : value * MONTHS_IN_YEAR;
  }, []);

  const handlePriceChange = useCallback(
    (age: number, field: FieldType, value: string) => {
      const fieldMap: Record<
        FieldType,
        { dependentField: FieldType; calculate: (val: string) => number }
      > = {
        monthlyPriceMale: {
          dependentField: "annualPriceMale",
          calculate: calculateAnnual,
        },
        monthlyPriceFemale: {
          dependentField: "annualPriceFemale",
          calculate: calculateAnnual,
        },
        annualPriceMale: {
          dependentField: "monthlyPriceMale",
          calculate: calculateMonthly,
        },
        annualPriceFemale: {
          dependentField: "monthlyPriceFemale",
          calculate: calculateMonthly,
        },
      };

      const newPrices = prices.map((price) => {
        if (price.age === age) {
          const updatedPrice = { ...price, [field]: value };

          const mapping = fieldMap[field];
          if (mapping) {
            updatedPrice[mapping.dependentField] = value
              ? mapping.calculate(value)
              : 0;
          }

          return updatedPrice;
        }
        return price;
      });

      setPrices(newPrices);
    },
    [calculateAnnual, calculateMonthly, prices, setPrices]
  );

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const XLSX = (await import("xlsx")).default;
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
