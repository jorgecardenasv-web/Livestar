export const parsedFormDataAge = (rawFormData: {
  [k: string]: FormDataEntryValue;
}) => {
  return Object.fromEntries(
    Object.entries(rawFormData).map(([key, value]) => {
      if (key === "age" && value !== "") {
        const parsedValue = parseInt(value as string, 10);
        return [key, isNaN(parsedValue) ? value : parsedValue];
      }
      return [key, value];
    })
  );
};
