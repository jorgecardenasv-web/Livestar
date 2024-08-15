import Link from "next/link";
import NavLinks from "@/features/dashboard/components/nav-link";
import { logout } from "@/features/auth/actions/auth";
import { ThemeSelect } from "@/shared/components/theme-switch";
import { PowerIcon } from "lucide-react";

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
        <div className="flex gap-2 md:flex-col">
          <ThemeSelect />
          <form action={logout}>
            <button className="flex h-[48px] w-full grow items-center bg-tremor-background dark:bg-dark-tremor-background-subtle dark:hover:bg-dark-tremor-brand-subtle justify-center gap-2 rounded-md ring-1 ring-tremor-ring dark:ring-0 p-3 text-sm font-medium hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon size={24} />
              <div className="hidden md:block">Cerrar sesión</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
