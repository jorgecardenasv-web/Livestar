'use server'

import { getServerSession } from "@/features/auth/services/auth";
import prisma from "@/lib/prisma";
import { updatePasswordSchema } from "../schemas/update-password";
import { simplifyZodErrors } from "@/shared/utils";
import { compare, hash } from 'bcrypt'


export const updatePassword = async (prevState: any, formData: FormData) => {
  const session = await getServerSession()

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const zodResult = updatePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmPassword
  })

  if (!zodResult.success) {
    const simplifiedErrors = simplifyZodErrors(zodResult.error)
    return {
      errors: simplifiedErrors
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      uuid: session!.user.id
    }
  })

  if (!user) {
    return {
      error: "El usuario no existe"
    }
  }

  const isValid = await compare(currentPassword, user.password!)

  if (!isValid) {
    return {
      error: "La contraseña actual es incorrecta"
    }
  }
  
  const result = await prisma.user.update({
    where: {
      uuid: session!.user.id
    },
    data: {
      password: await hash(newPassword, 10)
    }
  })
  

  return { result }
}