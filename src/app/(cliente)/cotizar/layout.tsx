import { HeaderSecondary } from "@/shared/components/layout/header-secondary";

export default function CotizarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSecondary />
      {children}
    </div>
  );
}
