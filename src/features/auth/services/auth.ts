import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { getServerSession as getServerSessionBase, NextAuthOptions, User } from "next-auth";
import { cookies } from 'next/headers';
import { encode } from 'next-auth/jwt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await compare(password, user.password!)) {
    return {
      id: user.uuid,
      email: user.email,
      name: user.name,
    };
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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return verifyCredentials(credentials.email, credentials.password);
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email!;
        session.user.name = token.name!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/admin/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function signIn(email: string, password: string) {
  const user = await verifyCredentials(email, password);

  if (user) {
    const session = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const encodedToken = await encode({
      token: {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      secret: process.env.NEXTAUTH_SECRET!,
    });

    cookies().set('next-auth.session-token', encodedToken, {
      expires: new Date(session.expires),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { error: null };
  }

  return { error: 'Invalid credentials' };
}

export const getServerSession = () => getServerSessionBase(authOptions);
