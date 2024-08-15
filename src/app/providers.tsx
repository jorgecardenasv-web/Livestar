"use client";

import { NotificationProvider } from "@/shared/hooks/notification-provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session} basePath={basePath}>
        <NotificationProvider>{children}</NotificationProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
