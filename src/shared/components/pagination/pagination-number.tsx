import clsx from "clsx";
import Link from "next/link";

export const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
  isDisabled,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
  isDisabled?: boolean;
}) => {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm rounded-md dark:border-tremor-brand border border-tremor-border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-tremor-brand-emphasis text-tremor-brand-muted dark:bg-dark-tremor-brand-subtle dark:text-dark-tremor-brand-emphasis font-semibold": isActive,
      "hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
      "border-transparent text-gray-400 cursor-default border-none": isDisabled,
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
};
