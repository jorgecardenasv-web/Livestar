import { UsersList } from "@/features/dashboard/components/list-users";
import { getUsers } from "@/features/dashboard/actions/get-users";
import { CardExample } from "@/features/dashboard/components/card";
import { Pagination } from "@/shared/components/pagination";
import { Card, CardContent } from "@/shared/components/ui/card";
// XLSX require "r"

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    status?: string;
    role?: string;
  };
}) {
  const { users, totalPages, totalUsers, usersPerPage } = await getUsers({
    page: Number(searchParams?.page || 1),
    status: searchParams?.status,
    role: searchParams?.role,
  });

  return (
    <>
      <Card>
        <CardContent className="space-y-6 p-6">
          <UsersList users={users} />
          <Pagination
            totalPages={totalPages}
            totalItems={totalUsers}
            itemsPerPage={usersPerPage}
            itemName="Usuario"
          />
        </CardContent>
      </Card>
    </>
  );
}
