import { getQuotesService } from "../services/read/get-quotes.service";
import { GetAllResponse } from "@/shared/types";
import { Quote } from "../types";

export interface FilterOptions extends Partial<Quote> {
  page: string;
  query?: string;
  limit?: string;
}

export const getQuotes = async (
  filtersOptions: FilterOptions
): Promise<GetAllResponse<Quote>> => {
  return await getQuotesService(filtersOptions);
};
