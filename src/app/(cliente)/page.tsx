import { Coverage } from "@/features/home/components/sections/coverage";
import { FooterPage } from "@/shared/components/layout/footer";
import { GreaterSpecialization } from "@/features/home/components/sections/greater-specialization";
import { Header } from "@/shared/components/layout/header";
import { Hero } from "@/features/home/components/sections/hero";
import { MedicalExpenses } from "@/features/home/components/sections/medical-expenses";
import { Quotes } from "@/features/home/components/sections/quotes";
import { SuccessStory } from "@/features/home/components/sections/success-story";
import { ScrollAnimatedComponent } from "@/shared/components/scroll-animated";
import { FooterComponent } from "@/shared/components/layout/footer_secondary";

export default function Home() {
  return (
    <>
      <ScrollAnimatedComponent>
        <Header />
        <Hero />
      </ScrollAnimatedComponent>
      <main className="text-white">
        <ScrollAnimatedComponent> 
          <Quotes />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <Coverage />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <MedicalExpenses />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <SuccessStory />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <GreaterSpecialization />
        </ScrollAnimatedComponent>
      </main>
    </>
  );
}
