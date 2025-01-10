import { create } from "zustand";
import { PriceData } from "../hooks/use-price-table";

interface InsurancePlanState {
  prices: PriceData[];
  setPrices: (prices: PriceData[]) => void;
}

export const useInsurancePlanStore = create<InsurancePlanState>((set) => ({
  prices: [],
  setPrices: (prices) => set({ prices }),
}));
