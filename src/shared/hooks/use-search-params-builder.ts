import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamsBuilder = (rowSearch: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "todos") {
      params.set(rowSearch, value);
    } else {
      params.delete(rowSearch);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { handleSearchParams, searchParams };
};
