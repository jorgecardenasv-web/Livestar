import { Quote } from "@prisma/client";
import { getQuoteByIdService } from "../services/read/get-quote-by-id.service";

export const getQuoteByIdLoader = async (quoteId: string) => {
  return await getQuoteByIdService(quoteId);
};
