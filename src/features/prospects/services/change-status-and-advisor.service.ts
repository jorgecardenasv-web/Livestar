import prisma from "@/lib/prisma";

export const changeStatusAndAdvisorService = async ({
  prospectId,
  advisorId,
}: {
  prospectId: string;
  advisorId: string;
}) => {
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
};
