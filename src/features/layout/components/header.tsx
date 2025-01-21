import { getSession } from "@/lib/iron-session/get-session";
import { HeaderClient } from "./header.client";
import { Card, CardContent } from "@/shared/components/ui/card";

export const Header = async () => {
  const session = await getSession();

  return (
    <header className="hidden md:block">
      <Card>
        <CardContent className="flex flex-row items-center justify-between gap-2 p-4">
          <div className="flex-wrap"></div>
          <HeaderClient label={session.user.name} />
        </CardContent>
      </Card>
    </header>
  );
};
