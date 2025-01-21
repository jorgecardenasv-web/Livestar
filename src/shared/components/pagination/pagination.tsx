"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext as PaginationNextBase,
  PaginationPrevious as PaginationPreviousBase,
} from "@/shared/components/ui/pagination";
import { pluralizeItemName } from "../../utils";

const PaginationPrevious = ({
  children,
  ...props
}: React.ComponentProps<typeof PaginationPreviousBase>) => (
  <PaginationPreviousBase {...props}>{children}</PaginationPreviousBase>
);

const PaginationNext = ({
  children,
  ...props
}: React.ComponentProps<typeof PaginationNextBase>) => (
  <PaginationNextBase {...props}>{children}</PaginationNextBase>
);

export function Pagination({
  totalPages,
  totalItems,
  itemsPerPage,
  itemName,
}: {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemName: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentPage = params.get("page");

    if (!currentPage) {
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, searchParams, replace]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const shouldShowPagination = totalItems > itemsPerPage;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
      <p className="text-sm text-muted-foreground flex flex-grow">
        Mostrando {startItem} a {endItem} de {totalItems} {pluralizeItemName(totalItems, itemName)}
      </p>
      {shouldShowPagination && (
        <PaginationBase className="w-full sm:w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1 ? createPageURL(currentPage - 1) : undefined
                }
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isCurrentPage = page === currentPage;

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={createPageURL(page)}
                      isActive={isCurrentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <PaginationEllipsis key={page} />;
              }

              return null;
            })}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageURL(currentPage + 1)
                    : undefined
                }
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                Siguiente
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </PaginationBase>
      )}
    </div>
  );
}
