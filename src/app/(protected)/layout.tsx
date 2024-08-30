import { MainLayout } from "@/features/layout/layouts/main-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>{children}</MainLayout>    
  );
}
