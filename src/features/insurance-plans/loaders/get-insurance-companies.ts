import { getInsurancePlansServices } from "../services/get-insurance-companies.service"

export const getInsurancePlans = async () => {
  return getInsurancePlansServices()
}