import { LightModeLayout } from "@/features/layout/layouts/light-layout";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeLayout>
      {children}
    </LightModeLayout>
  );
}
