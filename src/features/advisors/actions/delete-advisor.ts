'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteAdvisor = async (uuid: string): Promise<boolean> => {
    try {
        await prisma.user.delete({ where: { uuid } })
        revalidatePath('/asesores')

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}