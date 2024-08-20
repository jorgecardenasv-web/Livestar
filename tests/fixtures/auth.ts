import { Role } from "@prisma/client";

export const testUser = {
  id: "test-user-id",
  email: "user@example.com",
  name: "Test User",
  password: "TestPassword123",
  role: Role.ADMIN,
};