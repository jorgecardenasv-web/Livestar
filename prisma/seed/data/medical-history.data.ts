import { Prisma } from "@prisma/client";

export const medicalHistories: Prisma.MedicalHistoryCreateManyInput[] = [
  {
    id: "5d6e7f8g-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
    responses: {
      pregunta1: "No",
      pregunta2: "Sí",
      pregunta3: "No",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    quoteId: "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
  },
  {
    id: "6e7f8g9h-0i1j-2k3l-4m5n-6o7p8q9r0s1t",
    responses: {
      pregunta1: "Sí",
      pregunta2: "No",
      pregunta3: "Sí",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    quoteId: "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
  },
];
