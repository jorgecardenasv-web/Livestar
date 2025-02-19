"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { navLinks } from "../nav-config/nav-links";

export default function NavLinks({ userRole }: { userRole?: string | null }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full space-y-4 md:space-y-2">
      {navLinks
        .filter((link) =>
          link.roles.includes(userRole!) &&
          (link.visible !== false)
        )
        .map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex h-[48px] grow items-center gap-2 rounded p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
                "transition-colors duration-200 ease-in-out",
                "ring-1 ring-border",
                {
                  "bg-sky-100 text-sky-600 dark:bg-sky-800 dark:text-white":
                    isActive,
                  "bg-background hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-800 dark:hover:text-white dark:bg-background-subtle dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground":
                    !isActive,
                }
              )}
            >
              <LinkIcon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
    </div>
  );
}
