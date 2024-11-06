import { UsersList } from "@/features/dashboard/components/list-users";
import { getUsers } from "@/features/dashboard/actions/get-users";
import { CardExample } from "@/features/dashboard/components/card";
import { Pagination } from "@/shared/components/pagination";
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

  // function toXlsx(): any {
    // console.log(users);
    // const worksheet = XLSX.utils.json_to_sheet(rows);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
  // }

  return (
    <>
      <div className="flex gap-5 w-full flex-col lg:flex-row">
        <CardExample />
        <CardExample />
        <CardExample />
      </div>
      {/* <button onClick={toXlsx()}>dataaa</button> */}
      <UsersList users={users} />
      <Pagination
        totalPages={totalPages}
        totalItems={totalUsers}
        itemsPerPage={usersPerPage}
        itemName="Usuario"
      />
    </>
  );
}