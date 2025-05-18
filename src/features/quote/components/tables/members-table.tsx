import { formatCurrency } from "@/shared/utils";

/**
 * Interfaz para representar un miembro en una cotización de seguro.
 * Soporta tanto el formato de precio estándar como el formato de precios diferenciados
 * utilizado por aseguradoras como HDI, donde el primer mes tiene un costo diferente
 * a los meses restantes.
 */
interface Member {
  id: string;            // Identificador único del miembro
  type: string;          // Tipo de miembro (Titular, Pareja, Hijo/a, etc.)
  name?: string;         // Nombre opcional del miembro
  price: number;         // Precio estándar o precio anual
  primerMes?: number;    // Precio del primer mes (sólo para formato HDI)
  segundoMesADoce?: number; // Precio de los meses 2-12 (sólo para formato HDI)
}

/**
 * Componente para mostrar la tabla de miembros de una cotización.
 * Detecta automáticamente si los miembros tienen precios diferenciados y
 * muestra columnas adicionales cuando es necesario.
 */
export function MembersTable({ data }: { data: Member[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No hay asegurados registrados
      </div>
    );
  }

  // Verificar si los datos tienen la estructura con precios diferenciados (primerMes y segundoMesADoce)
  const hasDifferentiatedPrices = data.some(member => member.primerMes !== undefined && member.segundoMesADoce !== undefined);

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b text-xs">
            <th className="text-left p-2">Tipo</th>
            {hasDifferentiatedPrices ? (
              <>
                <th className="text-right p-2">Pago inicial</th>
                <th className="text-right p-2">Pago mes 2-12</th>
              </>
            ) : (
              <th className="text-right p-2">Prima</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.id} className="border-b last:border-0">
              <td className="p-2 text-sm">
                {member.type}
                {member.name && <span className="text-xs text-muted-foreground ml-1">({member.name})</span>}
              </td>
              {hasDifferentiatedPrices ? (
                <>
                  <td className="p-2 text-right text-sm">{formatCurrency(member.primerMes || member.price)}</td>
                  <td className="p-2 text-right text-sm">{formatCurrency(member.segundoMesADoce || 0)}</td>
                </>
              ) : (
                <td className="p-2 text-right text-sm">{formatCurrency(member.price)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
