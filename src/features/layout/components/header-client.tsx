'use client';

import { UserCircleIcon } from "lucide-react";
import { Dropdown } from "./dropdown";

export const HeaderClient = ({
  label,
}: {
  label: string
}) => {

  return (
    <header className="hidden md:block ring-1 ring-tremor-ring dark:ring-0 rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle p-4">
      <div className="hidden md:flex items-center justify-between">
        <h1 className="text-xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Dashboard
        </h1>
        <div className="w-48">
          <Dropdown
            label={label}
            icon={UserCircleIcon}
          />
        </div>
      </div>
    </header>
  );
};
