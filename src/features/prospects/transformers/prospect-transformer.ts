import { Prospect as PrismaProspect, User } from "@prisma/client";
import { Prospect } from "../types/prospect";

interface ProspectPayload extends PrismaProspect {
  user?: User
}

export const prospectTransformer = (prospect: ProspectPayload): Prospect => {
  return {
    id: prospect.id,
    name: prospect.name,
    email: prospect.email,
    createdAt: prospect.createdAt,
    updatedAt: prospect.updatedAt,
    additionalInfo: prospect.additionalInfo,
    isVerified: prospect.isVerified,
    gender: prospect.gender,
    age: prospect.age,
    postalCode: prospect.postalCode,
    protectWho: prospect.protectWho,
    whatsapp: prospect.whatsapp,
    userId: prospect.userId,
    status: prospect.status,
    lastContactDate: prospect.lastContactDate,
    user: prospect.user,
  };
};
