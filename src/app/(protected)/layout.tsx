import { MainLayout } from "@/features/layout/layouts/mainlayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>{children}</MainLayout>    
  );
}
