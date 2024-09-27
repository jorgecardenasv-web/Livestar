import prisma from "@/lib/prisma"

export const getSessionsService = async ({
  currentSessionId,
}: {
  currentSessionId: string;
}) => {
  return await prisma.session.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      active: true,
      NOT: {
        id: currentSessionId
      }
    }
  })
}