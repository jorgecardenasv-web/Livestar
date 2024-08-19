import Link from "next/link";
import NavLinks from "@/features/layout/components/nav-link";
import { ThemeSelect } from "@/shared/components/theme-switch";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h2 className="text-3xl font-bold">Livestar</h2>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle ring-1 ring-tremor-ring dark:ring-0 md:block"></div>
        <ThemeSelect />
      </div>
    </div>
  );
}
