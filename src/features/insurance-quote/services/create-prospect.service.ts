import prisma from "@/lib/prisma";
import { FormData } from "../schemas/form-schema";

export const createProspectService = async (
  {
    name,
    gender,
    age,
    postalCode,
    protectWho,
    whatsapp,
    email,
    ...additionalInfo
  }: FormData,
  advisorId: number,
) => {
  if (!advisorId) {
    throw new Error("No hay asesores disponibles para asignar al prospecto.");
  }

  const prospect = await prisma.$transaction(async (prisma) => {
    const createdProspect = await prisma.prospect.create({
      data: {
        name,
        gender,
        age,
        postalCode,
        protectWho,
        whatsapp,
        email,
        additionalInfo,
        User: { connect: { id: advisorId } },
      },
      include: {
        User: true,
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

  return prospect;
};
