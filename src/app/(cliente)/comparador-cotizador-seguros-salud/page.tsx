import { InsurancePlans } from "@/features/insurance-plans/components/insurance-plans";
import { getInsurancePlans } from "@/features/insurance-plans/loaders/get-insurance-companies";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { cookies } from "next/headers";

export default async function HealthInsuranceComparison() {
  const prospect = cookies().get("prospect")?.value;
  const plans = await getInsurancePlans();
  console.log("planes", plans);

  return (
    <div>
      <HeaderSecondary />
      <main className="flex flex-col items-center justify-center pb-16">
        <h1 className="text-5xl font-bold text-center md:text-lef text-wrap text-primary">
          ¡Ya tienes tu cotización disponible!
        </h1>
        <InsurancePlans insurancePlans={plans} />
      </main>
    </div>
  );
}
