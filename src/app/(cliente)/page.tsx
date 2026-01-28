import { Coverage } from "@/features/home/components/sections/coverage";
import { GreaterSpecialization } from "@/features/home/components/sections/greater-specialization";
import { Hero } from "@/features/home/components/sections/hero";
import { MedicalExpenses } from "@/features/home/components/sections/medical-expenses";
import { Quotes } from "@/features/home/components/sections/quotes";
import { GreaterSpecializationImg } from "@/features/home/components/sections/greater-specialization-img";
import { ContactForm } from "@/features/home/components/sections/contact-form";

export default function Home() {
  return (
    <div className="text-white">
      <Hero />
      <section>
        <div className="container mx-auto">
          <Quotes />
        </div>
        <Coverage />
        <MedicalExpenses />
        <GreaterSpecializationImg />
        <div className="container mx-auto">
          <GreaterSpecialization />
        </div>
        {/* <ContactForm/> */}
      </section>
    </div>
  );
}
