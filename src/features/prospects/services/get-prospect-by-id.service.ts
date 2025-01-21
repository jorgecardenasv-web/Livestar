import prisma from "@/lib/prisma";

export const getProspectByIdService = async (id: string) => {
  return await prisma.prospect.findUnique({
    where: {
      id: id
    },
    include: {
      user: true
    }
  });
};