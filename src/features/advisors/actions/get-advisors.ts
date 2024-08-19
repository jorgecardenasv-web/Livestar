'use server'

import prisma from "@/lib/prisma"
import { Advisor } from "../types/advisor"
import { advisorTransformer } from "../transformers/advisor-transformer"

export const getAdvisors = async (): Promise<Advisor[]> => {
  const advisors = await prisma.user.findMany({ where: { role: "ADVISOR" } })
    return advisors.map(advisorTransformer)
}