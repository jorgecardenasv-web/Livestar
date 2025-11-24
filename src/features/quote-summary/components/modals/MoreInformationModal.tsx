import { Card } from "@/shared/components/ui/card";
import {
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/shared/components/ui/table";
import React from "react";
import { useQuoteSumaryActions } from "../../hooks/use-quote-sumary-actions";
import { Button } from "@/shared/components/ui/button";
import { formatCurrency } from "@/shared/utils";

/**
 * Interface para representar un miembro en una cotización de seguro.
 * Soporta tanto el formato de precio estándar como el formato de precios diferenciados
 * utilizado por aseguradoras como HDI, donde el primer mes tiene un costo diferente
 * a los meses restantes.
 */
interface Member {
  id?: string;           // Identificador único del miembro
  type?: string;         // Tipo de miembro (Titular, Pareja, Hijo/a, etc.)
  name?: string;         // Nombre opcional del miembro
  price?: number;        // Precio estándar o precio anual
  primerMes?: number;    // Precio del primer mes (sólo para formato HDI)
  segundoMesADoce?: number; // Precio de los meses 2-12 (sólo para formato HDI)
  relationship?: string; // Relación opcional (para otros miembros)
}

export default function MoreInformationQuote() {
  const { modalProps, closeModal } = useQuoteSumaryActions();

  const getTotalMembers = () => {
    let count = modalProps.main ? 1 : 0;
    count += modalProps.partner ? 1 : 0;
    count += (modalProps.children?.length || 0);
    count += (modalProps.parents?.length || 0);
    count += (modalProps.others?.length || 0);
    return count;
  };

  // Verificar si los datos tienen estructura de precios diferenciados
  const hasDifferentiatedPrices = () => {
    // Verificar si alguno de los miembros tiene primerMes y segundoMesADoce definidos
    const checkMember = (member: any) => {
      if (!member || typeof member !== 'object') return false;

      // Check direct structure: { primerMes, segundoMesADoce }
      if (member.primerMes !== undefined && member.segundoMesADoce !== undefined) {
        return true;
      }

      // Check nested structure: { price: { primerMes, segundoMesADoce } }
      if (member.price && typeof member.price === 'object') {
        return member.price.primerMes !== undefined && member.price.segundoMesADoce !== undefined;
      }

      return false;
    };

    if (checkMember(modalProps.main) || checkMember(modalProps.partner)) {
      return true;
    }

    // Verificar en arrays de miembros
    if (modalProps.children && Array.isArray(modalProps.children)) {
      if (modalProps.children.some((child: any) => checkMember(child))) {
        return true;
      }
    }

    if (modalProps.parents && Array.isArray(modalProps.parents)) {
      if (modalProps.parents.some((parent: any) => checkMember(parent))) {
        return true;
      }
    }

    if (modalProps.others && Array.isArray(modalProps.others)) {
      if (modalProps.others.some((other: any) => checkMember(other))) {
        return true;
      }
    }

    return false;
  };

  const hasDiffPrices = hasDifferentiatedPrices();

  // Función para procesar un miembro del seguro y extraer datos relevantes
  const processInsuranceMember = (value: any): Member => {
    if (!value) return {};

    // Si es un objeto con estructura HDI (precios diferenciados)
    if (typeof value === 'object' && value !== null) {
      // Check if this is a parent or other member with nested price property
      if (value.price && typeof value.price === 'object') {
        const priceDetails = value.price;

        // If the nested price has HDI structure
        if (priceDetails.primerMes !== undefined && priceDetails.segundoMesADoce !== undefined) {
          return {
            price: priceDetails.anual || priceDetails.mensual || 0,
            primerMes: priceDetails.primerMes,
            segundoMesADoce: priceDetails.segundoMesADoce,
            name: value.name,
            relationship: value.relationship
          };
        }

        // If the nested price has standard GNP structure (mensual/anual)
        if (priceDetails.mensual !== undefined || priceDetails.anual !== undefined) {
          return {
            price: priceDetails.mensual || (priceDetails.anual ? priceDetails.anual / 12 : 0),
            name: value.name,
            relationship: value.relationship
          };
        }

        // If the nested price is just a number
        if (typeof priceDetails === 'number') {
          return {
            price: priceDetails,
            name: value.name,
            relationship: value.relationship
          };
        }
      }

      // Direct HDI structure (no nested price property)
      if (value.primerMes !== undefined && value.segundoMesADoce !== undefined) {
        return {
          price: value.price || value.anual || value.mensual || 0,
          primerMes: value.primerMes,
          segundoMesADoce: value.segundoMesADoce,
          name: value.name,
          relationship: value.relationship
        };
      }

      // Direct standard structure with price as a number
      if (value.price !== undefined && typeof value.price === 'number') {
        return {
          price: value.price,
          name: value.name,
          relationship: value.relationship
        };
      }

      // Direct GNP structure (mensual/anual)
      if (value.mensual !== undefined || value.anual !== undefined) {
        return {
          price: value.mensual || (value.anual ? value.anual / 12 : 0),
          name: value.name,
          relationship: value.relationship
        };
      }
    }

    // Si es un valor numérico directo
    if (typeof value === 'number') {
      return { price: value };
    }

    // Valor por defecto
    return { price: 0 };
  };

  // Renderizar una celda según el tipo de precios
  const renderPriceCell = (member: Member) => {
    if (hasDiffPrices) {
      return (
        <>
          <TableCell className="text-lg font-semibold text-[#223E99] text-center">
            {formatCurrency(member.primerMes !== undefined ? member.primerMes : member.price || 0)}
          </TableCell>
          <TableCell className="text-lg font-semibold text-[#223E99] text-center">
            {formatCurrency(member.segundoMesADoce !== undefined ? member.segundoMesADoce : 0)}
          </TableCell>
          <TableCell className="text-lg font-semibold text-[#223E99] text-center">
            {formatCurrency(member.price || 0)}
          </TableCell>
        </>
      );
    } else {
      return (
        <TableCell className="text-xl font-bold text-[#223E99] text-center">
          {formatCurrency(member.price || 0)}
        </TableCell>
      );
    }
  };

  const getFormattedValue = (key: string, value: any, protectWho: string) => {
    // Titular solo debe aparecer cuando está incluido en la cobertura
    // NO debe aparecer para "mis_padres" u "otros"
    if (key === "main" && ["solo_yo", "mi_pareja_y_yo", "familia", "mis_hijos_y_yo"].includes(protectWho)) {
      const member = processInsuranceMember(value);
      return (
        <TableRow key="main">
          <TableCell className="text-center">
            <div className="inline-block bg-sky-100 px-4 py-2 rounded-lg text-sky-700 font-medium">
              Titular
            </div>
          </TableCell>
          {renderPriceCell(member)}
        </TableRow>
      );
    }

    // Pareja solo debe aparecer cuando está incluida
    if (key === "partner" && ["mi_pareja_y_yo", "familia"].includes(protectWho)) {
      const member = processInsuranceMember(value);
      return (
        <TableRow key="partner">
          <TableCell className="text-center">
            <div className="inline-block bg-sky-100 px-4 py-2 rounded-lg text-sky-700 font-medium">
              Pareja
            </div>
          </TableCell>
          {renderPriceCell(member)}
        </TableRow>
      );
    }

    if (key === "children" && Array.isArray(value)) {
      return value.map((child, index) => {
        const member = processInsuranceMember(child);
        return (
          <TableRow key={`child-${index}`}>
            <TableCell className="text-center">
              <div className="inline-block bg-sky-100 px-4 py-2 rounded-lg text-sky-700 font-medium">
                {value.length > 1 ? `Hijo/a ${index + 1}` : 'Hijo/a'}
              </div>
            </TableCell>
            {renderPriceCell(member)}
          </TableRow>
        );
      });
    }

    if (key === "parents" && Array.isArray(value)) {
      return value.map((parent, index) => {
        const member = processInsuranceMember(parent);
        return (
          <TableRow key={`parent-${index}`}>
            <TableCell className="text-center">
              <div className="inline-block bg-sky-100 px-4 py-2 rounded-lg text-sky-700 font-medium">
                {member.name ? member.name : `Padre/Madre ${index + 1}`}
              </div>
            </TableCell>
            {renderPriceCell(member)}
          </TableRow>
        );
      });
    }

    if (key === "others" && Array.isArray(value)) {
      return value.map((other, index) => {
        const member = processInsuranceMember(other);
        return (
          <TableRow key={`other-${index}`}>
            <TableCell className="text-center">
              <div className="inline-block bg-sky-100 px-4 py-2 rounded-lg text-sky-700 font-medium">
                {member.relationship ? member.relationship : `Otro ${index + 1}`}
              </div>
            </TableCell>
            {renderPriceCell(member)}
          </TableRow>
        );
      });
    }

    return null;
  };

  return (
    <div className="w-full space-y-6">
      <div className="overflow-x-auto">
        <Table className="w-full border rounded-lg">
          <TableHeader>
            <TableRow className="bg-sky-50">
              <TableHead className="text-base font-bold text-center text-sky-700 w-[25%]">
                Integrante
              </TableHead>
              {hasDiffPrices ? (
                <>
                  <TableHead className="text-base font-bold text-center text-sky-700 w-[25%]">
                    Pago Inicial<br />(Mes 1)
                  </TableHead>
                  <TableHead className="text-base font-bold text-center text-sky-700 w-[25%]">
                    Pago Mensual<br />(Meses 2-12)
                  </TableHead>
                  <TableHead className="text-base font-bold text-center text-sky-700 w-[25%]">
                    Prima Anual
                  </TableHead>
                </>
              ) : (
                <TableHead className="text-base font-bold text-center text-sky-700">
                  Prima Individual
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(modalProps)
              .filter(([key]) => ['main', 'partner', 'children', 'parents', 'others'].includes(key))
              .map(([key, value]) => {
                return (
                  <React.Fragment key={key}>
                    {getFormattedValue(key, value, modalProps.protectWho)}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
        {hasDiffPrices && (
          <div className="bg-muted/30 rounded-md p-4 text-sm mt-4">
            <p className="text-muted-foreground font-medium">
              * Esta cotización muestra precios diferenciados. El pago del primer mes es diferente a los pagos de los meses 2-12.
            </p>
          </div>
        )}
        <Button
          onClick={closeModal}
          className="w-full text-lg mt-4"
          size="lg"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
}
