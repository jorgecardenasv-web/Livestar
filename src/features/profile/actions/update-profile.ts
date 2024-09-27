"use server";

import { simplifyZodErrors } from "@/shared/utils";
import { updateProfileSchema } from "../schemas/update-profile";
import { updateProfileService } from "../services/update-profile.service";
import { getSession } from "@/lib/iron-session/get-session";

export const updateProfile = async (prevState: any, formData: FormData) => {
  const session = await getSession()

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
  
  session.user.name = name
  session.user.email = email
  session.save()

  const result = await updateProfileService({
    userId: session.user.id,
    name,
    email,
  })

  return { result }
};
