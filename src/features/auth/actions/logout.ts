"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/iron-session/get-session";
import { deleteSessionService } from "@/features/session/services/delete-session.service";

export const logout = async () => {
  const session = await getSession();

  if (session) {
    await deleteSessionService(session.sessionId!);
  }

  redirect("/ini-ses-adm");
};
