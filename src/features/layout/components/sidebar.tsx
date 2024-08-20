import { getServerSession } from "@/features/auth/services/auth";
import { SidebarClient } from "./sidebar.client";

export const Sidebar = async () => {
  const session = await getServerSession();
  return (
    <>
      <SidebarClient user={session?.user} />
    </>
  );
};
