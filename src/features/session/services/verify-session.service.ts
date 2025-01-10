import { getSession } from "@/lib/iron-session/get-session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function checkSession() {
  const session = await getSession();

  const dbSession = await prisma.session.findUnique({
    where: { id: session.sessionId },
  });

  if (!dbSession?.active) {
    session.destroy();
    return redirect("/ini-ses-adm");
  }

  return true;
}
