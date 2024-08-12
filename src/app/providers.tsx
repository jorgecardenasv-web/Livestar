"use client";

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
      {children}
    </SessionProvider>
  );
}
