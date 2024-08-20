import { getServerSession } from "@/features/auth/services/auth";
import { HeaderClient } from "./header.client";

export const Header = async () => {
  const session = await getServerSession();

  return (
    <HeaderClient label={session?.user?.name || 'Usuario'} />
  );
};
