import { getServerSession } from "@/features/auth/services/auth";
import { HeaderClient } from "./header.client";

export const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="hidden md:block shadow-sm ring-1 ring-tremor-border dark:ring-dark-tremor-border rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle p-4">
      <HeaderClient label={session?.user?.name || "Usuario"} />
    </header>
  );
};
