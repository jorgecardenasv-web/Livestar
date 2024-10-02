import { User } from "@prisma/client";

export const authenticadedUser = (user: User) => {
  return {
    id: user.uuid,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };
};