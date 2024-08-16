import { UsersList } from "@/features/dashboard/components/list-users";
import { getUsers } from "@/features/dashboard/actions/get-users";
import { Card, ProgressBar } from "@tremor/react";
import { CardExample } from "@/features/dashboard/components/card";

export default async function Dashboard() {
  const users = await getUsers();
  return (
    <div className="flex h-full flex-col gap-y-10 items-center">
      <div className="flex gap-5 w-full flex-col lg:flex-row">
        <CardExample />
        <CardExample />
        <CardExample />
      </div>
      <UsersList users={users} />
      <UsersList users={users} />
    </div>
  );
}
