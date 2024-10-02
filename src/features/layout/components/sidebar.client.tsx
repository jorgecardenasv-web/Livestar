import Link from "next/link";
import NavLinks from "@/features/layout/components/nav-link";
import { ThemeSelector } from "@/features/theming/components/theme-selector";
import { Dropdown } from "./dropdown";
import { AuthenticadedUser } from "@/lib/iron-session/types";

export const SidebarClient = ({ user }: { user?: AuthenticadedUser }) => {
  return (
    <>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h2 className="text-3xl font-bold">Livestar</h2>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userRole={user?.role} />
        <div className="hidden h-auto w-full grow rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle ring-1 ring-tremor-border dark:ring-dark-tremor-border md:block"></div>
        <div className="flex flex-row items-center space-x-2">
          <ThemeSelector />
          <div className="md:hidden">
            <Dropdown />
          </div>
        </div>
      </div>
    </>
  );
};
