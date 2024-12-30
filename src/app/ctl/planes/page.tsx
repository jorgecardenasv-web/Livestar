import { getPlans } from "@/features/plans/loaders/get-plans";

export default async function Planes() {
  const plans = await getPlans();

  return (
    <div>
      <h1>Planes</h1>
      {
        plans.map((plan) => (
          <div key={plan.id}>
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
          </div>
        ))
      }
    </div>
  );
}
