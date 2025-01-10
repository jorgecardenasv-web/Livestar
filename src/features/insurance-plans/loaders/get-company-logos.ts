'use server'

import { Plan } from "../types/plan"
import { getImage } from "./get-image"


export async function getCompanyLogos(plans: Plan[]) {
  const logoPromises = plans.map(async (plan) => {
    const imageName = plan.company.logo.split('/').pop()
    if (imageName) {
      const logoSrc = await getImage(imageName)
      return { id: plan.id, logoSrc }
    }
    return { id: plan.id, logoSrc: '' }
  })

  const logos = await Promise.all(logoPromises)
  return Object.fromEntries(logos.map(({ id, logoSrc }) => [id, logoSrc]))
}

