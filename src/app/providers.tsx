"use client";

import { NotificationContainer } from "@/features/notification/components/notification.container";
import { ThemeProvider } from "@/features/theming/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NotificationContainer />
      {children}
    </>
  );
}
