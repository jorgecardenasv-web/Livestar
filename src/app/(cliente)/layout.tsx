import { LightModeLayout } from "@/features/layout/layouts/light-layout";
import { FooterComponent } from "@/shared/components/layout/footer_secondary";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeLayout>
      {children}
      <FooterComponent />
    </LightModeLayout>
  );
}
