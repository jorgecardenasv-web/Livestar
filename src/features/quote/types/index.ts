import {
  MedicalHistory,
  Quote as PrismaQuote,
  Prospect,
  User,
} from "@prisma/client";

export interface Quote extends PrismaQuote {
  user: User | null;
  prospect: Prospect | null;
  medicalHistories: MedicalHistory[] | null;
}

export * from "./Questions.interface";
export * from "./RadioOption";
export * from "./MedicalQuestions";
