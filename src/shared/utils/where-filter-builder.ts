export const whereFilterBuilder = <T>(filtersOptions: any): any => {
  const where: any = {};

  Object.keys(filtersOptions).forEach((key) => {
    if (!filtersOptions[key as keyof T]) return;
    where[key] = filtersOptions[key as keyof T];
  });

  return where;
};
