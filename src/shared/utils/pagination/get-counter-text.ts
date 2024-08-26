import { pluralizeItemName } from "./pluralize-item-name";

interface CounterStrategy {
  condition: (params: CounterParams) => boolean;
  getText: (params: CounterParams) => string;
}

interface CounterParams {
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
  itemName: string;
}

const counterStrategies: CounterStrategy[] = [
  {
    condition: ({ totalItems }) => totalItems === 0,
    getText: ({ itemName }) => `No hay ${pluralizeItemName(0, itemName)}`,
  },
  {
    condition: ({ totalItems }) => totalItems === 1,
    getText: ({ itemName }) => `1 ${itemName}`,
  },
  {
    condition: ({ totalItems, itemsPerPage }) => totalItems <= itemsPerPage,
    getText: ({ totalItems, itemName }) =>
      `${totalItems} ${pluralizeItemName(totalItems, itemName)}`,
  },
  {
    condition: () => true,
    getText: ({ startItem, endItem, totalItems, itemName }) =>
      `${startItem}-${endItem} de ${totalItems} ${pluralizeItemName(
        totalItems,
        itemName
      )}`,
  },
];

export const getCounterText = (params: CounterParams): string => {
  const strategy = counterStrategies.find((s) => s.condition(params));
  return strategy ? strategy.getText(params) : "";
};
