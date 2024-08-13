"use client";

import { NotificationProvider } from "@/shared/hooks/notification-provider";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
  session,
  basePath,
}: {
  children: React.ReactNode;
  session: any;
  basePath?: string;
}) {
  return (
    <SessionProvider session={session} basePath={basePath}>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
}
