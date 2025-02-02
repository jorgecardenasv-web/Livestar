import { FormData } from "../schemas/form-schema";

export const getDefaultState = (): FormData => ({
  name: "",
  gender: "",
  postalCode: "",
  protectWho: "solo_yo",
  whatsapp: "",
  email: "",
  age: 0,
});

export const normalizeFormData = (data?: any): FormData => {
  if (!data) return getDefaultState();

  const { prospect, protectWho, additionalInfo } = data;
  const baseData = {
    name: prospect?.name || "",
    gender: prospect?.gender || "",
    age: prospect?.age || 0,
    postalCode: prospect?.postalCode || "",
    whatsapp: prospect?.whatsapp || "",
    email: prospect?.email || "",
    protectWho: protectWho || "solo_yo",
  };

  switch (protectWho) {
    case "mi_pareja_y_yo":
      return {
        ...baseData,
        partnerGender: additionalInfo?.partnerGender || "",
        partnerAge: Number(additionalInfo?.partnerAge) || 0,
      };

    case "familia":
      const childrenCount = Number(additionalInfo?.childrenCount) || 0;
      const children = Array(childrenCount)
        .fill(null)
        .map((_, index) => ({
          age: Number(additionalInfo[`childAge${index}`]) || 0,
          gender: additionalInfo[`childGender${index}`] || "",
        }));

      return {
        ...baseData,
        partnerGender: additionalInfo?.partnerGender || "",
        partnerAge: Number(additionalInfo?.partnerAge) || 0,
        childrenCount,
        children,
      };

    case "mis_hijos_y_yo":
    case "solo_mis_hijos":
      const childCount = Number(additionalInfo?.childrenCount) || 0;
      const childrenData = Array(childCount)
        .fill(null)
        .map((_, index) => ({
          age: Number(additionalInfo[`childAge${index}`]) || 0,
          gender: additionalInfo[`childGender${index}`] || "",
        }));

      return {
        ...baseData,
        childrenCount: childCount,
        children: childrenData,
      };

    case "otros":
      const protectedCount = Number(additionalInfo?.protectedCount) || 0;
      const protectedPersons = Array(protectedCount)
        .fill(null)
        .map((_, index) => ({
          age: Number(additionalInfo[`protectedAge${index}`]) || 0,
          gender: additionalInfo[`protectedGender${index}`] || "",
          relationship: additionalInfo[`protectedRelationship${index}`] || "",
        }));

      return {
        ...baseData,
        protectedCount,
        protectedPersons,
      };

    case "mis_padres":
      return {
        ...baseData,
        momName: additionalInfo?.momName || "",
        dadName: additionalInfo?.dadName || "",
        momAge: Number(additionalInfo?.momAge) || 0,
        dadAge: Number(additionalInfo?.dadAge) || 0,
      };

    default:
      return baseData;
  }
};
