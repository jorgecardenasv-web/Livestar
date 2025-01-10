import prisma from "@/lib/prisma";

export const createSessionService = async (userId: string) => {
  return await prisma.session.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      user: true,
    },
  });
};
