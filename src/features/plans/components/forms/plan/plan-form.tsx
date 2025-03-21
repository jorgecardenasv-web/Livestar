"use client";

import { DollarSign, Percent } from "lucide-react";
import { PriceTableForm } from "./price-table-form";
import { createPlan } from "../../../actions/create-plan";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SelectInput } from "@/shared/components/ui/select-input";
import { useInsurancePlanForm } from "../../../hooks/use-insurance-plan-form";
import { useEffect, useMemo } from "react";
import { PlanType } from "@prisma/client";
import {
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/shared/components/ui/table";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { PriceTableHDIForm } from "./price-table-hdi-form";
import { NumberInput } from "@/shared/components/ui/number-input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Callout } from "@/shared/components/ui/callout";

interface Insurance {
  id: string;
  name: string;
}

interface Props {
  insurances: Insurance[];
  planTypes: PlanType[];
  plan?: any;
}

const isHDIPriceFormat = (prices: any[]): boolean => {
  if (!prices.length) return false;
  const firstPrice = prices[0];
  return 'monthlyPrice1' in firstPrice && 'monthlyPrice2to12' in firstPrice;
};

export const InsurancePlanForm = ({ insurances, plan, planTypes }: Props) => {
  const isUpdateMode = plan ? true : false;
  const {
    prices,
    setPrices,
    isMultiple,
    setIsMultiple,
    handleSubmit,
    isHDI,
    setIsHDI,
    isRecommended,
    setIsRecommended,
  } = useInsurancePlanForm(createPlan);

  useEffect(() => {
    if (plan?.prices?.length > 0) {
      setPrices(plan.prices);
      setIsHDI(isHDIPriceFormat(plan.prices));
    }
    if (plan?.deductibles) {
      setIsMultiple(!(plan.deductibles.default >= 0));
    }
    if (plan?.isRecommended) {
      setIsRecommended(plan.isRecommended);
    }
  }, [plan, setPrices, setIsMultiple, setIsHDI]);

  const planTypeOptions = useMemo(
    () =>
      planTypes.map((planType) => ({
        label: planType.name,
        value: planType.id,
      })),
    [planTypes]
  );

  const insurancesOptions = useMemo(() => {
    const options = insurances.map((insurance) => {
      return {
        label: insurance.name,
        value: insurance.id,
      };
    });
    return options;
  }, [insurances]);

  return (
    <form action={handleSubmit} className="mx-auto space-y-6 w-full">
      <div className="rounded-xl bg-muted/50 p-5">
        <Card>
          <CardContent className="space-y-6 p-6">
            
              <SelectInput
                name="planTypeId"
                label="Tipo de Plan"
                options={planTypeOptions}
                defaultValue={plan?.planType?.id}
                required
              />

            <SelectInput
              name="companyId"
              label="Compañía"
              options={insurancesOptions}
              defaultValue={plan?.company.id}
              required
            />

            <NumberInput
              name="sumInsured"
              label="Suma Asegurada"
              icon={<DollarSign className="w-4 h-4 text-gray-500" />}
              placeholder="Ingrese suma asegurada"
              defaultValue={plan?.sumInsured}
              required
            />

            <NumberInput
              name="coInsurance"
              label="Coaseguro"
              icon={<Percent className="w-4 h-4 text-gray-500" />}
              step="1"
              min={0}
              max={100}
              defaultValue={plan?.coInsurance}
              placeholder="Ej: 20%"
              required
            />

            <NumberInput
              name="coInsuranceCap"
              label="Tope de Coaseguro"
              icon={<DollarSign className="w-4 h-4 text-gray-500" />}
              placeholder="Ingrese tope de coaseguro"
              defaultValue={plan?.coInsuranceCap}
            />

            <div className="space-y-4">
              <div className="h-[1px] bg-border" /> {/* Divisor */}
              <div className="flex items-center justify-between px-2 py-4 rounded-lg bg-secondary/50">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRecommended"
                    name="isRecommended"
                    checked={Boolean(isRecommended)}
                    className="h-5 w-5 border-primary"
                    onCheckedChange={(checked) => setIsRecommended(checked === true)}
                  />
                  <Label
                    htmlFor="isRecommended"
                    className="font-medium"
                  >
                    Plan Recomendado
                  </Label>
                </div>
                <div className="text-sm text-muted-foreground">
                  Este plan aparecerá destacado en el cotizador
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* ------------------------------------------------------------------------- */}
      <div className="rounded-xl bg-muted/50 p-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between px-2 py-4 rounded-lg bg-secondary/50 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multipleDeductibles"
                  checked={Boolean(isMultiple)}
                  onCheckedChange={(checked) => setIsMultiple(checked === true)}
                  className="h-5 w-5 border-primary"
                />
                <Label htmlFor="multipleDeductibles" className="font-medium">
                  Múltiples opciones de deducible
                </Label>
              </div>
              <div className="text-sm text-muted-foreground">
                Permite configurar diferentes deducibles por nivel hospitalario
              </div>
            </div>

            {isMultiple ? (
              <ScrollArea className="overflow-x-auto px-5">
                <div className="rounded-xl bg-muted/50 p-5">
                  <Card>
                    <CardContent>
                      <Table className="w-full text-center border-collapse min-w-[600px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-48"></TableHead>
                            <TableHead className="w-1/2">Opción 2</TableHead>
                            <TableHead className="w-1/2">Opción 4</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {["A", "B", "C", "D"].map((nivel) => (
                            <TableRow key={nivel}>
                              <TableCell className="font-medium text-left whitespace-nowrap">
                                Nivel Hospitalario {nivel}
                              </TableCell>
                              <TableCell>
                                <div className="mx-auto">
                                  <NumberInput
                                    name={`deducible.opcion_2.${nivel}`}
                                    icon={
                                      <DollarSign className="w-4 h-4 text-gray-500" />
                                    }
                                    placeholder="Ingrese deducible"
                                    defaultValue={plan?.deductibles?.opcion_2?.[nivel]}
                                    className="w-full"
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="mx-auto">
                                  <NumberInput
                                    name={`deducible.opcion_4.${nivel}`}
                                    icon={
                                      <DollarSign className="w-4 h-4 text-gray-500" />
                                    }
                                    placeholder="Ingrese deducible"
                                    defaultValue={plan?.deductibles?.opcion_4?.[nivel]}
                                    className="w-full"
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            ) : (
              <div className="mx-12 my-8">
                <NumberInput
                  name="deducible.default"
                  label="Deducible"
                  icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                  placeholder="Ingrese Deducible"
                  defaultValue={plan?.deductibles?.default}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------------- */}
      <input type="hidden" name="isUpdate" value={isUpdateMode.toString()} />
      {
        isUpdateMode && (
          <div>
            <input type="hidden" name="planId" value={plan?.id} />
          </div>
        )
      }
      <div className="rounded-xl bg-muted/50 p-5">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between px-2 py-4 rounded-lg bg-secondary/50">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isHDI"
                  checked={Boolean(isHDI)}
                  onCheckedChange={(checked) => {
                    setIsHDI(checked === true);
                    setPrices([]);
                  }}
                  className="h-5 w-5 border-primary"
                />
                <Label htmlFor="isHDI" className="font-medium">
                  Plan HDI
                </Label>
              </div>
              <div className="text-sm text-muted-foreground">
                Configura precios específicos para HDI
              </div>
            </div>

            {isHDI ? (
              <PriceTableHDIForm prices={prices} setPrices={setPrices} />
            ) : (
              <PriceTableForm prices={prices} setPrices={setPrices} />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl bg-muted/50 p-5">
        <SubmitButton
          label={`${!isUpdateMode ? "Crear Plan" : "Actualizar Plan"}`}
          labelPending={`${!isUpdateMode ? "Creando..." : "Actualizando..."}`}
          className="w-full"
          type="submit"
        />
      </div>
    </form >
  );
};
