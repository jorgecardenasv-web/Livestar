import prisma from "@/lib/prisma";
import { Prospect } from "@prisma/client";

export const updateProspectService = async (
  prospectId: string,
  {
    name,
    gender,
    age,
    postalCode,
    protectWho,
    whatsapp,
    email,
    ...additionalInfo
  }: any
) => {
  return await prisma.prospect.update({
    where: {
      id: prospectId,
    },
    data: {
      name,
      gender,
      age,
      postalCode,
      protectWho,
      whatsapp,
      email,
      additionalInfo,
    },
  });
};
