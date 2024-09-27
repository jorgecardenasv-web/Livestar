"use server";

import { RedirectType, redirect } from "next/navigation";

import { signinSchema } from "../schemas/signin";
import { verifyCredentialsService } from "../services/verify-credentials.service";

import { getSession } from "@/lib/iron-session/get-session";
import { createSessionService } from "@/features/session/services/create-session.service";
import { prefix } from "@/shared/utils/constants";
import { simplifyZodErrors } from "@/shared/utils";

export interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
  error?: string;
}

export const signin = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const session = await getSession();

  const result = signinSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    const simplifiedErrors = simplifyZodErrors(result.error);
    return {
      errors: simplifiedErrors,
    };
  }

  const user = await verifyCredentialsService(email, password);

  if (!user) {
    return {
      error: "Invalid credentials",
    };
  }

  const sessionDB = await createSessionService(user);

  if (!sessionDB) {
    return {
      error: "Internal server error",
    };
  }

  session.isLoggedIn = true;
  session.user = user;
  session.sessionId = sessionDB.id;

  await session.save();

  redirect(`${prefix}/dashboard`, RedirectType.replace);
};
