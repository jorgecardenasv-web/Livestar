import { LightModeLayout } from "@/features/layout/layouts/light-layout";
import { Footer } from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </LightModeLayout>
  );
}
