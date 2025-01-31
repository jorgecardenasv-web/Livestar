import Link from "next/link";
import NavLinks from "@/features/layout/components/nav-link";
import { ThemeSelector } from "@/features/theming/components/theme-selector";
import { Dropdown } from "./dropdown";
import { AuthenticadedUser } from "@/lib/iron-session/types";
import { prefix } from "@/shared/utils/constants";

export const SidebarClient = ({ user }: { user?: AuthenticadedUser }) => {
  return (
    <>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded bg-primary p-4 md:h-40"
        href={`${prefix}/panel`}
      >
        <div className="w-32 text-white md:w-40">
          <h2 className="text-3xl font-bold">Livestar</h2>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userRole={user?.role} />
        <div className="hidden h-auto w-full grow rounded dark:bg-background-subtle border md:block"></div>
        <div className="flex flex-row items-center space-x-2">
          <div className="md:hidden">
            <Dropdown />
          </div>
        </div>
      </div>
    </>
  );
};
