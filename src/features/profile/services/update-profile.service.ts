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
      uuid: userId,
    },
    data: {
      name,
      email,
    },
  });
};
