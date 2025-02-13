import { Coverage } from "@/features/home/components/sections/coverage";
import { GreaterSpecialization } from "@/features/home/components/sections/greater-specialization";
import { Header } from "@/shared/components/layout/header";
import { Hero } from "@/features/home/components/sections/hero";
import { MedicalExpenses } from "@/features/home/components/sections/medical-expenses";
import { Quotes } from "@/features/home/components/sections/quotes";
import { GreaterSpecializationImg } from "@/features/home/components/sections/greater-specialization-img";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="text-white">
        <div className="container mx-auto">
          <Quotes />
        </div>
        <Coverage />
        <MedicalExpenses />
        <GreaterSpecializationImg />
        <div className="container mx-auto">
          <GreaterSpecialization />
        </div>
      </main>
    </>
  );
}
