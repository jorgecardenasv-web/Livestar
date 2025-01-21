import { getProspectByIdService } from "../services/get-prospect-by-id.service";
import { prospectTransformer } from "../transformers/prospect-transformer";

export const getProspectById = async (id: string) => {
  const prospect = await getProspectByIdService(id);

  if (!prospect) {
    throw new Error("Prospecto no encontrado.");
  }

  const transformedProspect = prospectTransformer(prospect as any);

  const { additionalInfo, ...rest } = transformedProspect;

  return {
    ...rest,
    ...(typeof additionalInfo === "object" && additionalInfo !== null
      ? additionalInfo
      : {}),
  };
};
