export type Language = "en" | "es";

export type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};