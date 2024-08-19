"use client";

import React, { useEffect } from "react";
import { UserCircleIcon, UserPen } from "lucide-react";
import { Dropdown } from "./dropdown";
import { getSession } from "next-auth/react";

export const Header = () => {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const session = async () => {
    const getSesion =await getSession();
    setCurrentUser(getSesion?.user);
  };
  
  useEffect(() => {
    session();
  }, []);

  const handleOptionClick = (action: string) => {
    console.log("Acción seleccionada:", action);
  };

  const dropdownOptions = [
    {
      label: "Mi Perfil",
      value: "profile",
      icon: UserPen,
      onClick: () => handleOptionClick("profile"),
    }
  ];

  return (
    <header className="hidden md:block ring-1 ring-tremor-ring dark:ring-0 rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle p-4">
      <div className="hidden md:flex items-center justify-between">
        <h1 className="text-xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Dashboard
        </h1>
        <div className="w-48">
          <Dropdown
            options={dropdownOptions}
            label={currentUser?.name}
            icon={UserCircleIcon}
          />
        </div>
      </div>
    </header>
  );
};
