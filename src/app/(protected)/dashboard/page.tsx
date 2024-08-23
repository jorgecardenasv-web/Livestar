import { UsersList } from "@/features/dashboard/components/list-users";
import { getUsers } from "@/features/dashboard/actions/get-users";
import { CardExample } from "@/features/dashboard/components/card";
import { Pagination } from "@/shared/components/pagination";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    status?: string;
    role?: string;
  };
}) {
  const { users, totalPages } = await getUsers({
    page: Number(searchParams?.page || 1),
    status: searchParams?.status,
    role: searchParams?.role,
  });
  return (
    <>
      <div className="flex gap-5 w-full flex-col lg:flex-row">
        <CardExample />
        <CardExample />
        <CardExample />
      </div>
      <UsersList users={users} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
