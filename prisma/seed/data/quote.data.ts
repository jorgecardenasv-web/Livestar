import { Prisma } from "@prisma/client";

export const quotes: Prisma.QuoteCreateManyInput[] = [
  {
    id: "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
    prospectId: "1e2f3g4h-5i6j-7k8l-9m0n-1o2p3q4r5s6t",
    planId: "560b3006-0faf-44ac-b498-b7cc5976605a",
    totalPrice: 15000,
    status: "NUEVO",
    createdAt: new Date(),
    updatedAt: new Date(),
    protectWho: "Familia",
    additionalInfo: {
      notas: "Cliente interesado en cobertura amplia",
    },
  },
  {
    id: "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
    prospectId: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
    planId: "24ec1aba-d7d9-4090-9c61-fa9a324b96bb",
    totalPrice: 12000,
    status: "CONTACTADO",
    createdAt: new Date(),
    updatedAt: new Date(),
    protectWho: "Individual",
    additionalInfo: {
      notas: "Cliente busca plan básico",
    },
  },
];
