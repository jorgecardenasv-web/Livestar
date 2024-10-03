import { QuoteSummary } from "@/features/quote-summary/components/quote-sumary";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { ArrowLeft } from "lucide-react";
import { StaticImageData } from "next/image";
import { notFound } from "next/navigation";

export interface InsuranceQuoteData {
  company: string;
  companyLogo: StaticImageData;
  plan: string;
  paymentType: string;
  sumInsured: number;
  deductible: number;
  coInsurance: number;
  coInsuranceCap: number;
  coverage_fee: number;
}

export default function QuoteSummaryPage({
  searchParams,
}: {
  searchParams: {
    data: string;
  };
}) {
  let data: InsuranceQuoteData | null = null;

  if (typeof searchParams.data === "string") {
    try {
      data = JSON.parse(searchParams.data) as InsuranceQuoteData;
    } catch (error) {
      console.error("Error parsing insurance data:", error);
    }
  }

  if (!data) {
    notFound();
  }

  return (
    <>
      <HeaderSecondary />
      <div className="py-14 px-5">
        <QuoteSummary {...data} />
      </div>
    </>
  );
}
