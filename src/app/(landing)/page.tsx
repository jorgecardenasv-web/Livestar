import { Coverage } from "@/features/home/components/coverage";
import { FooterPage } from "@/features/home/components/footer";
import { GreaterSpecialization } from "@/features/home/components/greater-specialization";
import { Header } from "@/features/home/components/header";
import { Hero } from "@/features/home/components/hero";
import { MedicalExpenses } from "@/features/home/components/medical-expenses";
import { Quotes } from "@/features/home/components/quotes";
import { SuccessStory } from "@/features/home/components/success-story";
import { ScrollAnimatedComponent } from "@/shared/components/ScrollAnimatedComponent";

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
        <FooterPage />
      </main>
    </>
  );
}
