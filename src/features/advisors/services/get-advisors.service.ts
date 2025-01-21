import prisma from "@/lib/prisma";

export const getAdvisorsService = async () => {
  return await prisma.user.findMany({
    where: {
      role: "ASESOR",
    }
  });
};