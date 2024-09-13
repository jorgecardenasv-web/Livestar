import { Coverage } from "@/features/home/components/coverage";
import { FooterPage } from "@/features/home/components/footer";
import { GreaterSpecialization } from "@/features/home/components/greater-specialization";
import { Header } from "@/features/home/components/header";
import { Hero } from "@/features/home/components/hero";
import { MedicalExpenses } from "@/features/home/components/medical-expenses";
import { Quotes } from "@/features/home/components/quotes";
import { SuccessStory } from "@/features/home/components/success-story";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="text-white">
        <Quotes />
        <Coverage />
        <MedicalExpenses />
        <SuccessStory />
        <GreaterSpecialization />
        <FooterPage />
      </main>
    </>
  );
}
