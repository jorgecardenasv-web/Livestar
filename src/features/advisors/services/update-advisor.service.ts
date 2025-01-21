import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const updateAdvisorService = async (
  email: string,
  name: string,
  status: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        status: status === "1" ? "ACTIVE" : "INACTIVE",
        email,
      },
    });

    return user;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
