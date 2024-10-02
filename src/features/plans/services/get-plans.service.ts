import prisma from "@/lib/prisma"
import { InsurancePlan } from "@prisma/client"

export const GetPlansService = (): Promise<InsurancePlan[]> => {
  return prisma.insurancePlan.findMany()
}