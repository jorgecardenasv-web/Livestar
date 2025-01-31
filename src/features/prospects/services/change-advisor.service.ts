import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const changeAdvisorService = async ({
  prospectId,
  advisorId,
}: {
  prospectId: string;
  advisorId: string;
}) => {
  try {
    const advisor = await prisma.user.findUnique({
      where: {
        id: advisorId,
      },
    });

    return await prisma.prospect.update({
      where: {
        id: prospectId,
      },
      data: {
        user: { connect: { id: advisor?.id } },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
