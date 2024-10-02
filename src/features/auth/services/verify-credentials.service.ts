import { compare } from "bcrypt";
import { authenticadedUser } from "../transformers/authenticaded-user";
import prisma from "@/lib/prisma";

export const verifyCredentialsService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await compare(password, user.password!))) {
    return authenticadedUser(user);
  }

  return null;
};