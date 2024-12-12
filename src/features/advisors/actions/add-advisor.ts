"use server";
import { simplifyZodErrors } from "@/shared/utils";
import { addAdvisorSchema } from "../schemas/add-advisor";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export const addAdvisor = async (prevState: any, formData: FormData) => {
  const email: string = formData.get("email") as string;
  const password: string = formData.get("password") as string;
  const name: string = formData.get("name") as string;
  const passwordConfirmation: string = formData.get(
    "password-confirmation"
  ) as string;

  if (password !== passwordConfirmation) {
    return {
      errors: {
        password: "Las contraseñas no coinciden.",
        passwordConfirmation: "Las contraseñas no coinciden.",
      },
    };
  }

  const zodResult = addAdvisorSchema.safeParse({
    email,
    password,
    name,
  });

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);

    return {
      errors: simplifiedErrors,
    };
  }

  const user: User | null = await createAdvisor(email, password, name);

  if (!user) {
    return {
      errors: {
        general: "Error al crear el asesor.",
      },
    };
  }

  revalidatePath("/asesores");
  return {
    errors: null,
  };
};

const createAdvisor = async (
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
        role: "ADVISOR",
      },
    });

    return user;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
