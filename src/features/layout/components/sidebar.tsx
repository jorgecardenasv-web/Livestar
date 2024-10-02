
import { getSession } from "@/lib/iron-session/get-session";
import { SidebarClient } from "./sidebar.client";

export const Sidebar = async () => {
  const session = await getSession();
  return (
    <aside className="flex h-full flex-col px-3 py-4 md:px-2 w-full md:w-64">
      <SidebarClient user={session.user} />
    </aside>
  );
};
