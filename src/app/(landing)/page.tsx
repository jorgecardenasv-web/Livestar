import { Coverage } from "@/features/home/components/coverage/coverage";
import { FooterPage } from "@/features/home/components/footer/footer";
import { GreaterSpecialization } from "@/features/home/components/greater-specialization/greater-specialization";
import { Header } from "@/features/home/components/header/header";
import { MedicalExpenses, Component } from "@/features/home/components/medical-expenses/medical-expenses";
import { Quotes } from "@/features/home/components/quotes/quotes";
import { SuccessStory } from "@/features/home/components/success-story/success-story";

export default function Home() {
  return (
    <>
      <div style={{ color: "white" }}>
        <Header />
        <Quotes />
        <Coverage />
        {/* <MedicalExpenses /> */}
        <Component />
        <SuccessStory />
        <GreaterSpecialization />
        <FooterPage />
      </div>
    </>
  );
}
