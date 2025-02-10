import prisma from "@/lib/prisma";
import { prospectTransformer } from "@/features/prospects/transformers/prospect-transformer";
import { handlePrismaError } from "@/shared/errors/prisma";
import { FormData } from "../../schemas/form-schema";

export const createProspectService = async (
  data: FormData,
  advisorId: string = ""
) => {
  try {
    const prospect = await prisma.$transaction(async (prisma) => {
      const createdProspect = await prisma.prospect.create({
        data,
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
