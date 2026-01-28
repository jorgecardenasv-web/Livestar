import { Role, UserStatus } from "@generated/prisma/enums";

export interface AuthenticadedUser {
  id: string;
  email: string;
  name: string;
  role: Role | null;
  status: UserStatus | null;
}