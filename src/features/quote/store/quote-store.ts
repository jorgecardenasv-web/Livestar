import { create } from "zustand";

interface QuoteStore {
  prospect: any;
  quote: any;
  setProspect: (data: any) => void;
  setQuote: (data: any) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  prospect: {},
  quote: {},
  setProspect: (data) => set(() => ({ prospect: data })),
  setQuote: (data) => set(() => ({ quote: data })),
}));
