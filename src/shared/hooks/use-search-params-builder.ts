import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BuilderReturn {
  handleSearchParams: (key: string, value: string) => void;
  updateMultipleParams: (params: Record<string, string>) => void;
  removeParam: (key: string) => void;
  resetAllParams: () => void;
  searchParams: URLSearchParams;
}

export function useSearchParamsBuilder(): BuilderReturn {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "todos") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateMultipleParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "todos") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newPath);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const queryString = params.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newPath);
  };

  const resetAllParams = () => {
    router.push(pathname);
  };

  return {
    handleSearchParams,
    updateMultipleParams,
    removeParam,
    resetAllParams,
    searchParams,
  };
}
