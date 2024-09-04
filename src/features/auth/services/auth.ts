import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import {
  getServerSession as getServerSessionBase,
  NextAuthOptions,
} from "next-auth";
import { cookies } from "next/headers";
import { decode, encode, JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { userTransformer } from "@/features/dashboard/transformers/user-transformer";

type UpdateableUserData = {
  name?: string;
  email?: string;
  role?: string;
};

type ExtendedJWT = JWT &
  UpdateableUserData & {
    exp?: number;
  };

async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await compare(password, user.password!))) {
    return user;
  }
  return null;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return verifyCredentials(credentials.email, credentials.password).then(
          (user) => {
            if (!user) {
              return null;
            }
            return {
              id: user.uuid,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        );
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.role = token.role!;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function signIn(email: string, password: string) {
  "use server";
  const user = await verifyCredentials(email, password);
  if (!user) return { error: "Invalid credentials" };

  const session = {
    user: { id: user.uuid, email: user.email, name: user.name, role: user.role },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const sessionDB = await prisma.session.create({
    data: {
      expires: session.expires,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  const encodedToken = await encode({
    token: { sub: user.uuid, email: user.email, name: user.name, role: user.role, sessionId: sessionDB.id },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  cookies().set("next-auth.session-token", encodedToken, {
    expires: new Date(session.expires),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return { error: null };
}

export async function updateSession(updatedData: Partial<UpdateableUserData>) {
  "use server";
  const sessionToken = cookies().get("next-auth.session-token")?.value;

  if (!sessionToken) throw new Error("No session found");

  const decodedToken = (await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })) as ExtendedJWT | null;

  if (!decodedToken) throw new Error("Invalid token");

  const updatedToken: ExtendedJWT = {
    ...decodedToken,
    ...updatedData,
    exp: decodedToken.exp || Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
  };

  const newEncodedToken = await encode({
    token: updatedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  cookies().set("next-auth.session-token", newEncodedToken, {
    expires: new Date(updatedToken.exp! * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return { success: true };
}

export const getServerSession = () => getServerSessionBase(authOptions);
