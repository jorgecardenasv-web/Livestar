import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "@/features/auth/services/auth";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: {
        id: token.sessionId as string,
      },
    });

    if (!session) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
