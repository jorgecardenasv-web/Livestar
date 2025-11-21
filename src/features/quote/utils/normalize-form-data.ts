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

export const normalizeFormData = (initialData?: any): FormData => {
  if (!initialData) {
    return {} as FormData;
  }

  // Base data
  const normalized: FormData = {
    age: initialData.prospect?.age || 0,
    name: initialData.prospect?.name || "",
    gender: initialData.prospect?.gender || "",
    postalCode: initialData.prospect?.postalCode || "",
    whatsapp: initialData.prospect?.whatsapp || "",
    email: initialData.prospect?.email || "",
    protectWho: initialData.protectWho || "",
  };

  // Additional info - manejar estructura anidada duplicada si existe
  if (initialData.additionalInfo) {
    // Si additionalInfo tiene una propiedad additionalInfo anidada, usar esa
    const additionalInfo = initialData.additionalInfo.additionalInfo
      ? initialData.additionalInfo.additionalInfo
      : initialData.additionalInfo;

    // Procesar protectedCount y protectedPersons
    if (additionalInfo.protectedCount) {
      normalized.protectedCount = additionalInfo.protectedCount;
      normalized.protectedPersons =
        additionalInfo.protectedPersons?.map((person: any) => ({
          relationship: person.relationship || "",
          age: person.age || 0,
          gender: person.gender || "",
        })) || [];
    }

    // Procesar información de niños
    if (additionalInfo.childrenCount) {
      normalized.childrenCount = additionalInfo.childrenCount;
      normalized.children =
        additionalInfo.children?.map((child: any) => ({
          age: child.age || 0,
          gender: child.gender || "",
        })) || [];
    }

    // Procesar edad personal y de pareja
    if (additionalInfo.age !== undefined) {
      normalized.age = additionalInfo.age;
    }
    if (additionalInfo.partnerAge !== undefined) {
      normalized.partnerAge = additionalInfo.partnerAge;
      normalized.partnerGender = additionalInfo.partnerGender || "";
    }

    // Procesar información de padres
    if (additionalInfo.momName || additionalInfo.dadName) {
      normalized.momName = additionalInfo.momName || "";
      normalized.momAge = additionalInfo.momAge || 0;
      normalized.dadName = additionalInfo.dadName || "";
      normalized.dadAge = additionalInfo.dadAge || 0;
    }
  }

  return normalized;
};
