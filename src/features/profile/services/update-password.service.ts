import prisma from "@/lib/prisma";

export const updatePasswordService = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
};