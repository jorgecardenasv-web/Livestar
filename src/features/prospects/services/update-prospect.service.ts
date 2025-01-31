import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const updateProspectService = async (
  prospectId: string,
  {
    name,
    gender,
    age,
    postalCode,
    protectWho,
    whatsapp,
    email,
    ...additionalInfo
  }: any
) => {
  try {
    return await prisma.prospect.update({
      where: {
        id: prospectId,
      },
      data: {
        name,
        gender,
        age,
        postalCode,
        protectWho,
        whatsapp,
        email,
        additionalInfo,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
