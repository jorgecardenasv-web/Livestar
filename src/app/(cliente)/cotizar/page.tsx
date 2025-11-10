import { redirect } from 'next/navigation';
import { getProspect } from "@/features/plans/loaders/get-prospect";

export default async function QuotePage() {
  const { prospect } = await getProspect();
  const hasProspect = Object.keys(prospect).length > 0;

  if (hasProspect) {
    return redirect('/cotizar/planes');
  }
  
  redirect('/cotizar/flow');
}
