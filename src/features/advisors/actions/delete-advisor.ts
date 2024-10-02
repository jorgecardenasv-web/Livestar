'use server'
import prisma from "@/lib/prisma"
import { prefix } from "@/shared/utils/constants"
import { revalidatePath } from "next/cache"

export const deleteAdvisor = async (uuid: string): Promise<boolean> => {
    try {
        await prisma.user.delete({ where: { uuid } })
        revalidatePath(`${prefix}/asesores`)

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}