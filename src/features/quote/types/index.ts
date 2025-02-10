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

export * from "./Questions.interface";
export * from "./RadioOption";
export * from "./MedicalQuestions";
