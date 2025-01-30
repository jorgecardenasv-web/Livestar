import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const updateAdvisorService = async (
  advisorId: string,
  email: string,
  name: string,
  status: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({
      where: {
        id: advisorId,
      },
      data: {
        name,
        status: status === "1" ? "ACTIVO" : "INACTIVO",
        email,
      },
    });

    return user;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
