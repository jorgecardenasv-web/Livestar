type FilterOptions = Record<string, any>;

export const whereFilterBuilder = <T>(filtersOptions: FilterOptions) => {
  const where: any = {};

  Object.entries(filtersOptions).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      where[key] = value;
    }
  });

  return where;
};

export const textSearchFilterBuilder = (
  searchTerm: string,
  fields: string[]
): any => {
  if (!searchTerm) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    })),
  };
};
