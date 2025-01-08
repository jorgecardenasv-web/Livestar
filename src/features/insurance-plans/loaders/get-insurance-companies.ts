import { getInsuranceCompaniesService } from "../services/get-insurance-companies.service";

export const getInsuranceCompany = () => {
  return getInsuranceCompaniesService();
};
