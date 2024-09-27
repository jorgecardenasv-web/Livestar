import prisma from "@/lib/prisma";

export const deleteSessionService = async (sessionId: string) => {
  return await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
