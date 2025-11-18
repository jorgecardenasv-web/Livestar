"use client";

import { NotificationContainer } from "@/features/notification/components/notification.container";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NotificationContainer />
      {children}
    </>
  );
}
