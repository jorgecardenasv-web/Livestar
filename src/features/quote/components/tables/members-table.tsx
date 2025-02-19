import { formatCurrency } from "@/shared/utils";

interface Member {
  id: string;
  type: string;
  name?: string;
  price: number;
}

export function MembersTable({ data }: { data: Member[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No hay asegurados registrados
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b text-xs">
            <th className="text-left p-2">Tipo</th>
            <th className="text-right p-2">Prima</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.id} className="border-b last:border-0">
              <td className="p-2 text-sm">
                {member.type}
                {member.name && <span className="text-xs text-muted-foreground ml-1">({member.name})</span>}
              </td>
              <td className="p-2 text-right text-sm">{formatCurrency(member.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
