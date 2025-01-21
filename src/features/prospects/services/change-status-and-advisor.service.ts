import prisma from "@/lib/prisma";
import { ProspectStatus } from "@prisma/client";

export const changeStatusAndAdvisorService = async ({
  prospectId,
  advisorId,
  status,
}: {
  prospectId: string;
  advisorId: string;
  status: ProspectStatus;
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
      status,
      user: { connect: { id: advisor?.id } },
    },
  });
};
