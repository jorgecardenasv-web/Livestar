import { LightModeLayout } from "@/features/layout/layouts/light-layout";
import { Footer } from "@/shared/components/layout/footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeLayout>
      {children}
      <Footer />
    </LightModeLayout>
  );
}
