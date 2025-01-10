interface PluralizationRule {
  test: RegExp;
  replace: string | ((match: string) => string);
}

const pluralizationRules: PluralizationRule[] = [
  { test: /ora$/i, replace: "oras" },
  { test: /ana$/i, replace: "anas" },
  { test: /ona$/i, replace: "onas" },
  { test: /esa$/i, replace: "esas" },
  { test: /ina$/i, replace: "inas" },
  { test: /iza$/i, replace: "izas" },
  { test: /triz$/i, replace: "trices" },

  { test: /or$/i, replace: "ores" },
  { test: /án$/i, replace: (match) => match.slice(0, -2) + "anes" },
  { test: /ón$/i, replace: (match) => match.slice(0, -2) + "ones" },
  { test: /z$/i, replace: (match) => match.slice(0, -1) + "ces" },
  { test: /([aeiou])s$/i, replace: "$1ses" },
  { test: /([^aeiou])s$/i, replace: "$1es" },
  { test: /ís$/i, replace: "ises" },
  { test: /í$/i, replace: "íes" },
  { test: /(.)$/i, replace: "$1s" },
];

export const pluralizeItemName = (count: number, itemName: string): string => {
  if (count === 1) return itemName;

  const lowerItemName = itemName.toLowerCase();

  for (const rule of pluralizationRules) {
    if (rule.test.test(lowerItemName)) {
      if (typeof rule.replace === "string") {
        return itemName.replace(rule.test, rule.replace);
      } else {
        return rule.replace(itemName);
      }
    }
  }

  return itemName + "s";
};
