"use server";

import prisma from "@/lib/prisma";
import { simplifyZodErrors } from "@/shared/utils";
import { updateProfileSchema } from "../schemas/update-profile";
import { getServerSession, updateSession } from "@/features/auth/services/auth";

export const updateProfile = async (prevState: any, formData: FormData) => {
  const session = await getServerSession();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const zodResult = updateProfileSchema.safeParse({
    name,
    email,
  });

  
  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);
    
    return {
      errors: simplifiedErrors,
    };
  }
  
  updateSession({ ...session!.user, name, email });

  const result = await prisma.user.update({
    where: {
      uuid: session!.user.id,
    },
    data: {
      name,
      email,
    },
  });

  return { result }
};
