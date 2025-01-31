import prisma from "@/lib/prisma";
import { FormData } from "../schemas/form-schema";
import { prospectTransformer } from "@/features/prospects/transformers/prospect-transformer";
import { handlePrismaError } from "@/shared/errors/prisma";

export const createProspectService = async (
  data: FormData,
  advisorId: string = ""
) => {
  try {
    const prospect = await prisma.$transaction(async (prisma) => {
      const createdProspect = await prisma.prospect.create({
        data: {
          ...data,
          user: { connect: { id: advisorId! } },
        },
      });

      await prisma.user.update({
        where: { id: advisorId },
        data: {
          lastProspectAssigned: new Date(),
          isNewAdvisor: false,
        },
      });

      return createdProspect;
    });

    return prospectTransformer(prospect);
  } catch (error) {
    throw handlePrismaError(error);
  }
};
