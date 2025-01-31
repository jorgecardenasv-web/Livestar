import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const updateProfileService = async ({
  userId,
  email,
  name,
}: {
  userId: string;
  name: string;
  email: string;
}) => {
  try {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
