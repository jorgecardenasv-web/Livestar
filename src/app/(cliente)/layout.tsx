import { LightModeLayout } from "@/features/layout/layouts/light-layout";
import { Footer } from "@/shared/components/layout/footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeLayout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
      </div>
    </LightModeLayout>
  );
}
