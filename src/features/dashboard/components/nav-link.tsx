'use client';

import { ContactIcon, HomeIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Cuentas', href: '/dashboard/accounts', icon: UsersIcon },
  { name: 'Asesores', href: '/asesores', icon: ContactIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium dark:font-normal md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-tremor-brand-muted text-tremor-brand-emphasis dark:bg-dark-tremor-brand-subtle dark:text-dark-tremor-brand-emphasis': isActive,
                'bg-tremor-background-default dark:bg-dark-tremor-background-subtle ring-1 dark:ring-0 ring-tremor-ring hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis': !isActive,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}