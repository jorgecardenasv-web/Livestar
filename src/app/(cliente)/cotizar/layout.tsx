import { HeaderSecondary } from "@/shared/components/layout/header-secondary";

export default function CotizarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <HeaderSecondary />
      {children}
    </div>
  );
}
