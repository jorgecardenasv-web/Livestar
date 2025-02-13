import { Coverage } from "@/features/home/components/sections/coverage";
import { GreaterSpecialization } from "@/features/home/components/sections/greater-specialization";
import { Header } from "@/shared/components/layout/header";
import { Hero } from "@/features/home/components/sections/hero";
import { MedicalExpenses } from "@/features/home/components/sections/medical-expenses";
import { Quotes } from "@/features/home/components/sections/quotes";
import { SuccessStory } from "@/features/home/components/sections/success-story";
import { ScrollAnimatedComponent } from "@/shared/components/ui/scroll-animated";
import { GreaterSpecializationImg } from "@/features/home/components/sections/greater-specialization-img";
import { ContactForm } from "@/features/home/components/sections/contact-form";

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
          {/* TODO: Añadir informacion para cobertura medica */}
          {/* <SuccessStory /> */}
          <div></div>
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <GreaterSpecializationImg />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
          <GreaterSpecialization />
        </ScrollAnimatedComponent>
        <ScrollAnimatedComponent>
        <ContactForm/>
        </ScrollAnimatedComponent>
      </main>
    </>
  );
}
