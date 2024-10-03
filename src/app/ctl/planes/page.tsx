import { getPlans } from "@/features/plans/loaders/get-plans";

export default async function Planes() {
  const plans = await getPlans();

  console.log({ plans });

  return (
    <div>
      <h1>Planes</h1>
    </div>
  );
}
