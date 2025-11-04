import { create } from "zustand";

interface QuoteStore {
  prospect: any;
  setProspect: (data: any) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  prospect: {},
  setProspect: (data) => set((state) => ({ prospect: data })),
}));
