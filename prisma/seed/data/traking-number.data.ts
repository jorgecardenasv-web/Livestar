import { faker } from "@faker-js/faker/locale/es";
import type { Prisma } from "@prisma/client";

export const trackingNumbers: Prisma.TrackingNumberCreateManyInput[] = [
  {
    id: faker.string.uuid(),
    number: "TRACK123456",
    quoteId: "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActivity: new Date(),
    activityLog: {
      actividades: [
        {
          fecha: new Date(),
          descripcion: "Cotización enviada",
        },
      ],
    },
  },
  {
    id: faker.string.uuid(),
    number: "TRACK654321",
    quoteId: "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActivity: new Date(),
    activityLog: {
      actividades: [
        {
          fecha: new Date(),
          descripcion: "Cliente contactado",
        },
      ],
    },
  },
];
