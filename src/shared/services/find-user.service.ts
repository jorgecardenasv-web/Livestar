import prisma from "@/lib/prisma";

const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      uuid: id,
    },
  });
};

export const AuthService = {
  findUserById,
};