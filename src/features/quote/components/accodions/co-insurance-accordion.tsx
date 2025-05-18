import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { formatCurrency, formatPercentage } from "@/shared/utils"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { User, Users } from "lucide-react"
import { CoInsuranceAccordionProps, Member } from "../../types"

const OPTION_LABELS: { [key: string]: string } = {
  opcion_2: "Coaseguro (0-44 años)",
  opcion_4: "Coaseguro (45+ años)",
}

const LEVEL_LABELS: { [key: string]: string } = {
  A: "Nivel Hospitalario A",
  B: "Nivel Hospitalario B",
  C: "Nivel Hospitalario C",
  D: "Nivel Hospitalario D",
}

export function CoInsuranceAccordion({
  coInsuranceData,
  coInsuranceCapData,
  additionalInfo,
  protectWho,
  mainAge = 0
}: CoInsuranceAccordionProps) {
  if (!coInsuranceData || !additionalInfo) return null;

  const getAgeGroup = (age: number) => age >= 45 ? 'opcion_4' : 'opcion_2';

  const safeMainAge = typeof mainAge === 'number' ? mainAge : 0;

  const members: Member[] = [];

  switch (protectWho) {
    case "solo_yo":
      members.push({ type: 'Titular', age: safeMainAge });
      break;

    case "mi_pareja_y_yo":
      members.push(
        { type: 'Titular', age: safeMainAge },
        { type: 'Pareja', age: additionalInfo.partnerAge ?? 0 }
      );
      break;

    case "familia":
    case "mis_hijos_y_yo":
      members.push({ type: 'Titular', age: safeMainAge });
      if (additionalInfo.partnerAge) {
        members.push({ type: 'Pareja', age: additionalInfo.partnerAge });
      }
      if (additionalInfo.children) {
        additionalInfo.children.forEach((child, index) => {
          members.push({ type: `Hijo/a ${index + 1}`, age: child.age || 0 });
        });
      }
      break;

    case "solo_mis_hijos":
      if (additionalInfo.children) {
        additionalInfo.children.forEach((child, index) => {
          members.push({
            type: `Hijo/a ${index + 1}`,
            age: child.age || 0
          });
        });
      }
      break;

    case "mis_padres":
      if (additionalInfo.momAge) {
        members.push({
          type: 'Madre',
          age: additionalInfo.momAge,
          name: additionalInfo.momName
        });
      }
      if (additionalInfo.dadAge) {
        members.push({
          type: 'Padre',
          age: additionalInfo.dadAge,
          name: additionalInfo.dadName
        });
      }
      break;

    case "otros":
      if (additionalInfo.protectedPersons) {
        additionalInfo.protectedPersons.forEach((person, index) => {
          members.push({
            type: person.relationship,
            age: person.age || 0,
          });
        });
      }
      break;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(coInsuranceData).map(([optionKey, coInsurances]) => {
        const membersInGroup = members.filter(member => getAgeGroup(member.age) === optionKey);

        if (membersInGroup.length === 0) return null;

        if (optionKey !== 'opcion_2' && optionKey !== 'opcion_4') return null;

        const coInsuranceCaps = coInsuranceCapData?.[optionKey as keyof typeof coInsuranceData];

        return (
          <AccordionItem key={optionKey} value={optionKey}>
            <AccordionTrigger className="text-sm hover:no-underline group">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span>{OPTION_LABELS[optionKey]}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {membersInGroup.length} {membersInGroup.length === 1 ? 'miembro' : 'miembros'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm bg-muted/50 rounded-lg p-3 mb-3">
                {Object.entries(coInsurances).map(([levelKey, value]) => (
                  <div key={levelKey} className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">{LEVEL_LABELS[levelKey]}:</span>
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-primary">{formatPercentage(value)}</span>
                      {coInsuranceCaps && (
                        <span className="text-xs text-muted-foreground">
                          (Tope: {formatCurrency(coInsuranceCaps[levelKey as keyof typeof coInsuranceCaps])})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span className="font-medium">Miembros que aplican:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {membersInGroup.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {member.type.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">
                          {member.type}
                          {member.name && (
                            <span className="text-muted-foreground ml-1">- {member.name}</span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.age} años
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
