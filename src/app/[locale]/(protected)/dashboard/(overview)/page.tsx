
import { Suspense } from "react";
import { UsersList } from "@/features/dashboard/components/list-users";
import { getUsers } from "@/features/dashboard/actions/user";
import { TableSkeleton } from "@/features/dashboard/components/loading";

export default async function Dashboard() {
  const users = await getUsers();
  
  return (
    <div className="flex h-screen flex-col gap-y-10 items-center p-24">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<TableSkeleton columns={["Name", "Email"]} rowCount={5} />}>
        <UsersList users={users} />
      </Suspense>
    </div>
  );
}
