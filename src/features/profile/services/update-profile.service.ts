import prisma from "@/lib/prisma";

export const updateProfileService = async ({
  userId,
  email,
  name,
}: {
  userId: string;
  name: string;
  email: string;
}) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
    },
  });
};
