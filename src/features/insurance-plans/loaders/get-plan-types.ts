import { getPlanTypesSirvice } from "../services/get-plan-types.service"

export const getPlanTypes = async () => {
  return getPlanTypesSirvice()
}