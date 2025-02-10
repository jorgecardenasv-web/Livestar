export interface PriceData {
  age: number;
  monthlyPriceMale: number;
  monthlyPriceFemale: number;
  annualPriceMale: number;
  annualPriceFemale: number;
}

export type PriceField = keyof Omit<PriceData, "age">;
