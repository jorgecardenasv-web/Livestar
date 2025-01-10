import prisma from "@/lib/prisma";

export const createSessionService = async (user: any) => {
  return await prisma.session.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      user: true,
    },
  });
};
