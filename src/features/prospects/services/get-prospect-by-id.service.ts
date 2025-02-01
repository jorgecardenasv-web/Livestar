import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getProspectByIdService = async (id: string) => {
  try {
    return await prisma.prospect.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
