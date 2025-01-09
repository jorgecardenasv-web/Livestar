import { Prospect } from "@prisma/client";
import { getProspectsService } from "../services/get-prospects.service";
import { prospectTransformer } from "../transformers/prospect-transformer";

interface GetProspects extends Partial<Prospect> {
  advisorId?: string;
  page: number;
  query: string;
}

export const getProspects = async (filtersOptions: GetProspects) => {
  const prospects = await getProspectsService(filtersOptions);
  return prospects.map((prospect) => prospectTransformer(prospect as any));
};
