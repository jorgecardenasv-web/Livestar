"use client";

import { generatePagination } from "../utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { PaginationArrow } from "./pagination-arrow";
import { PaginationNumber } from "./pagination-number";
import { useEffect } from "react";

export const Pagination = ({ totalPages }: { totalPages: number }) => {
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

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center lg:justify-between mx-3">
      <p className="hidden lg:block text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
        Página {currentPage} de {totalPages}
      </p>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-x-1">
          {allPages.map((page, index) => (
            <PaginationNumber
              key={index}
              href={typeof page === "number" ? createPageURL(page) : "#"}
              page={page}
              isActive={currentPage === page}
              isDisabled={page === "..."}
            />
          ))}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
};
