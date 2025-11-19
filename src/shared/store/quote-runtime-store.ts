"use client";

import { create } from "zustand";

interface SelectedPlanData {
  company: string;
  imgCompanyLogo: string;
  plan: string;
  paymentType: string;
  sumInsured: any;
  deductible: any;
  coInsurance: any;
  coInsuranceCap: any;
  coverage_fee: any;
  individualPricesJson?: string;
  id: string;
  isMultipleString?: string;
  deductiblesJson?: string;
  isMultipleCoInsurance?: string;
  coInsuranceJson?: string;
  coInsuranceCapJson?: string;
  protectedWho: any;
}

interface QuoteRuntimeState {
  quoteId?: string;
  selectedPlanData?: SelectedPlanData;
  setQuoteId: (id?: string) => void;
  setSelectedPlanData: (data?: SelectedPlanData) => void;
  clear: () => void;
}

export const useQuoteRuntimeStore = create<QuoteRuntimeState>((set) => ({
  quoteId: undefined,
  selectedPlanData: undefined,
  setQuoteId: (id) => set({ quoteId: id }),
  setSelectedPlanData: (data) => set({ selectedPlanData: data }),
  clear: () => set({ quoteId: undefined, selectedPlanData: undefined }),
}));