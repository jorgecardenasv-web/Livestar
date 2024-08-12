'use server'

import { simplifyZodErrors } from "@/shared/utils";
import { signinSchema } from "../schemas/login.schema";
import { signIn } from "../services/auth";
import { getTranslations } from 'next-intl/server';

export async function authenticate(prevState: any, formData: FormData) {
  const t = await getTranslations('signin');

  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

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
      return { error: 'errors.auth.invalidCredentials' };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'errors.auth.unexpected' };
  }
}