"use server";

export const addPlan = async (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log(rawFormData);
};
