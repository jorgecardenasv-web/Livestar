"use client";

import { Dropdown } from "./dropdown";

export const HeaderClient = ({ label }: { label: string }) => {
  return (
    <div className="hidden md:flex items-center justify-between">
      <h1 className="text-xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Dashboard
      </h1>
      <div data-testid="user-options" className="w-48">
        <Dropdown label={label} />
      </div>
    </div>
  );
};
