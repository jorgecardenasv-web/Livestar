
import { getSession } from "@/lib/iron-session/get-session";
import { HeaderClient } from "./header.client";

export const Header = async () => {
  const session = await getSession();

  return (
    <header className="hidden md:block shadow-sm ring-1 ring-tremor-border dark:ring-dark-tremor-border rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle p-4">
      <HeaderClient label={session.user.name} />
    </header>
  );
};
