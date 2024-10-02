"use client";

import { Dropdown } from "./dropdown";

export const HeaderClient = ({ label }: { label: string }) => {
  return (
    <div className="hidden md:flex items-center justify-between">
      <div />
      <div data-testid="user-options" className="w-48">
        <Dropdown label={label} />
      </div>
    </div>
  );
};
