import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role.ADMIN | Role.ADVISOR;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: Role.ADMIN | Role.ADVISOR;
  }
}
import NextAuth from "next-auth";
