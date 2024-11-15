"use server";
import { simplifyZodErrors } from "@/shared/utils";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { editAdvisorSchema } from "../schemas/edit-advisor";

export const editAdvisor = async (prevState: any, formData: FormData) => {
  const email: string = formData.get("email") as string;
  const name: string = formData.get("name") as string;
  const status: string = formData.get("status") as string;

  const zodResult = editAdvisorSchema.safeParse({
    email,
    name,
  });

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error);
    return {
      errors: simplifiedErrors,
    };
  }

  const user: User | null = await updateAdvisor(email, name, status);

  if (!user) {
    return {
      errors: {
        general: "Error al editar al asesor.",
      },
    };
  }

  revalidatePath("/asesores");
  return {
    errors: null,
  };
};

const updateAdvisor = async (
  email: string,
  name: string,
  status: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        status: status === "1" ? "ACTIVE" : "INACTIVE",
        email,
      },
    });

    return user;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
