import { encode } from "next-auth/jwt";

export async function createEncodedToken(user: { id: string; email: string; name: string }) {
  const token = {
    name: user.name,
    email: user.email,
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
  };

  return await encode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}

export function createAuthCookie(encodedToken: string) {
  return {
    name: "next-auth.session-token",
    value: encodedToken,
    domain: new URL(process.env.NEXTAUTH_URL!).hostname,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
}