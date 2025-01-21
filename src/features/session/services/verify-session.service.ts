import prisma from "@/lib/prisma";

export const checkSession = (sessionId: string) => {
  return prisma.session.findUnique({
    where: { id: sessionId },
  });
};
