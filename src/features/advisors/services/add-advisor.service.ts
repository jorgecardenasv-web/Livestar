import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "@generated/prisma/client";
import { handlePrismaError } from "@/shared/errors/prisma";

export const createAdvisorService = async (
  email: string,
  password: string,
  name: string
): Promise<User | null> => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ASESOR",
      },
    });

    return user;
  } catch (error: any) {
    throw handlePrismaError(error);
  }
};
