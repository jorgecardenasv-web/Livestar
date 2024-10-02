import { InsurancePlans } from "@/features/insurance-plans/components/insurance-plans";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";

export default function HealthInsuranceComparison() {
  return (
    <div>
      <HeaderSecondary />
      <main className="flex flex-col items-center justify-center pb-16">
        <h1 className="text-5xl font-bold text-center md:text-lef text-wrap text-tremor-content-emphasis">
          ¡Tu cotización está lista!
        </h1>
        <InsurancePlans />
      </main>
    </div>
  );
}
