import { Prospect } from "@prisma/client";
import { getProspectsService } from "../services/get-prospects.service";
import { prospectTransformer } from "../transformers/prospect-transformer";
import { GetAllResponse } from "@/shared/types";

interface GetProspects extends Partial<Prospect> {
  advisorId?: string;
  page: number;
  query: string;
}

export const getProspects = async (filtersOptions: GetProspects) => {
  const response = await getProspectsService(filtersOptions);
  return {
    ...response,
    data: {
      ...response.data,
      items: response.data.items.map((prospect) =>
        prospectTransformer(prospect as any)
      ),
    },
  };
};
