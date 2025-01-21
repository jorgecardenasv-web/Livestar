import { Role, UserStatus } from "@prisma/client";

export interface AuthenticadedUser {
  id: string;
  email: string;
  name: string;
  role: Role | null;
  status: UserStatus | null;
}