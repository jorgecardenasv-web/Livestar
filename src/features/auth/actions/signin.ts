'use server'


import { simplifyZodErrors } from "@/shared/utils";
import { signinSchema } from "../schemas/signin";
import { signIn } from "../services/auth";
import { redirect, RedirectType } from "next/navigation";


export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const zodResult = signinSchema.safeParse({
    email,
    password,
  });

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);

    return {
      errors: simplifiedErrors,
    };
  }

  const result = await signIn(email, password);

  if (result.error) {
    return { error: "El email o la contraseña son incorrectos" };
  }

  redirect("/dashboard", RedirectType.replace);
}