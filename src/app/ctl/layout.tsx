import { MainLayout } from "@/features/layout/layouts/main-layout";
import { SessionValidator } from "@/features/session/components/main/session-validator";
;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <SessionValidator />
      {children}
    </MainLayout>
  );
}
