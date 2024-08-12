import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { getServerSession as getServerSessionBase } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from 'next/headers';
import { encode } from 'next-auth/jwt';

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
        sub: user.id
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
