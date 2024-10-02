'use server';

import { redirect } from "next/navigation";

import { getSession } from "@/lib/iron-session/get-session";
import { deleteSessionService } from "@/features/session/services/delete-session.service";


export const signout = async () => {
  const session = await getSession();

  await deleteSessionService(session.sessionId!);
  
  session.destroy();

  redirect("/ini-ses-adm");
};
