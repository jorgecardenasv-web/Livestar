import { type Prisma, Role, UserStatus } from "@prisma/client";
import { hashSync } from "bcrypt";

const generatePasswordHash = (password: string): string => {
  return hashSync(password, 10);
};

export const users: Prisma.UserCreateInput[] = [
  {
    id: "a1b2c3d4-e5f6-7777-8888-999900000001",
    name: "Admin User",
    email: "admin@example.com",
    password: generatePasswordHash("password123"),
    role: Role.ADMIN,
    status: UserStatus.ACTIVO,
    isNewAdvisor: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];