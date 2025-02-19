import {
  Insurance,
  PlanType,
  Plan as PrismaPlan,
  Quote as PrismaQuote,
  Prospect,
  User,
} from "@prisma/client";

interface Plan extends PrismaPlan {
  planType: PlanType;
  company: Insurance;
}

export interface Quote extends PrismaQuote {
  user: User | null;
  prospect: Prospect | null;
  plan: Plan | null;
}

// Definir tipos más específicos para los datos de deducibles
export type DeductibleLevel = {
  A: number;
  B: number;
  C: number;
  D: number;
};

export type DeductiblesData = {
  opcion_2?: DeductibleLevel;
  opcion_4?: DeductibleLevel;
};

// Tipos más específicos para la información adicional
export interface ProtectedPerson {
  relationship: string;
  age: number;
  gender: string;
}

export interface Child {
  age: number;
  gender: string;
}

export interface AdditionalInfo {
  age?: number;
  partnerAge?: number;
  partnerGender?: string;
  children?: Child[];
  childrenCount?: number;
  protectedPersons?: ProtectedPerson[];
  momAge?: number;
  dadAge?: number;
  momName?: string;
  dadName?: string;
}

export interface Member {
  type: string;
  age: number;
  name?: string;
}

export interface DeductiblesAccordionProps {
  deductiblesData: DeductiblesData | null;
  additionalInfo: AdditionalInfo | null;
  protectWho: string;
  mainAge: number | null;
}

export * from "./Questions.interface";
export * from "./RadioOption";
export * from "./MedicalQuestions";
