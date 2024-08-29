import { Coverage } from "@/features/home/components/coverage/coverage";
import { GreaterSpecialization } from "@/features/home/components/greater-specialization/greater-specialization";
import { Header } from "@/features/home/components/header/header";
import { MedicalExpenses } from "@/features/home/components/medical-expenses/medical-expenses";
import { Quotes } from "@/features/home/components/quotes/quotes";

export default function Home() {
  return (
    <>
      <div style={{ color: "white" }}>
        <Header />
        <Quotes />
        <Coverage />
        <MedicalExpenses />
        <GreaterSpecialization />
      </div>
    </>
  );
}
