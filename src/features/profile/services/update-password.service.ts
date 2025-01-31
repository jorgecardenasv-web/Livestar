import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const updatePasswordService = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  try {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
