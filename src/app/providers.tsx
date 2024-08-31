"use client";

import { NotificationContainer } from "@/features/notification/components/notification.container";
import { ThemeProvider } from "@/features/theming/components/theme-provider";
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
    <ThemeProvider>
      <SessionProvider session={session} basePath={basePath}>
        <NotificationContainer />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
