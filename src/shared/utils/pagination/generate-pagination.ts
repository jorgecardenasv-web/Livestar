type PageItem = number | "...";

interface PaginationStrategy {
  condition: (params: PaginationParams) => boolean;
  generate: (params: PaginationParams) => PageItem[];
}

interface PaginationParams {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

const ELLIPSIS: PageItem = "...";

const paginationStrategies: PaginationStrategy[] = [
  {
    condition: ({ totalPages, maxVisiblePages = 7 }) =>
      totalPages <= maxVisiblePages,
    generate: ({ totalPages }) =>
      Array.from({ length: totalPages }, (_, i) => i + 1),
  },
  {
    condition: ({ currentPage, maxVisiblePages = 7 }) =>
      currentPage <= Math.ceil(maxVisiblePages / 2),
    generate: ({ totalPages, maxVisiblePages = 7 }) => [
      ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => i + 1),
      ELLIPSIS,
      totalPages,
    ],
  },
  {
    condition: ({ currentPage, totalPages, maxVisiblePages = 7 }) =>
      currentPage >= totalPages - Math.floor(maxVisiblePages / 2),
    generate: ({ totalPages, maxVisiblePages = 7 }) => [
      1,
      ELLIPSIS,
      ...Array.from(
        { length: maxVisiblePages - 2 },
        (_, i) => totalPages - maxVisiblePages + 3 + i
      ),
    ],
  },
  {
    condition: () => true, // default case
    generate: ({ currentPage, totalPages, maxVisiblePages = 7 }) => [
      1,
      ELLIPSIS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      ELLIPSIS,
      totalPages,
    ],
  },
];

export const generatePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 7,
}: PaginationParams): PageItem[] => {
  const strategy = paginationStrategies.find((s) =>
    s.condition({ currentPage, totalPages, maxVisiblePages })
  );
  return strategy
    ? strategy.generate({ currentPage, totalPages, maxVisiblePages })
    : [];
};
