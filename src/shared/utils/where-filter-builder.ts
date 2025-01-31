import { JsonValue } from "@prisma/client/runtime/library";

type FilterValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | JsonValue;

type FilterOptions<T> = {
  [k in keyof T]?: T[k] extends FilterValue ? T[k] : never;
};

type WhereClause = {
  OR?: Array<
    | { [key: string]: { contains: string; mode: "insensitive" } }
    | {
        [key: string]: {
          [key: string]: { contains: string; mode: "insensitive" };
        };
      }
  >;
};

export function filterOptionsToWhere<T extends Record<string, FilterValue>>(
  filtersOptions: FilterOptions<T>
): Partial<T> {
  const where: Partial<T> = {};

  Object.entries(filtersOptions).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      where[key as keyof T] = value as T[keyof T];
    }
  });

  return where;
}

export function textSearchFilterBuilder(
  searchTerm: string,
  fields: string[],
  relatedFields: { [key: string]: string[] } = {}
): WhereClause {
  if (!searchTerm) {
    return {};
  }

  const directFieldsSearch = fields.map((field) => ({
    [field]: {
      contains: searchTerm,
      mode: "insensitive" as const,
    },
  }));

  const relatedFieldsSearch = Object.entries(relatedFields).flatMap(
    ([relation, fields]) =>
      fields.map((field) => ({
        [relation]: {
          [field]: {
            contains: searchTerm,
            mode: "insensitive" as const,
          },
        },
      }))
  );

  return {
    OR: [
      ...directFieldsSearch,
      ...(relatedFieldsSearch.length > 0 ? relatedFieldsSearch : []),
    ],
  };
}
