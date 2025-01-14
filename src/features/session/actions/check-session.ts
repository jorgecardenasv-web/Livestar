"use server";

import { getSession } from "@/lib/iron-session/get-session";
import { checkSession } from "../services/verify-session.service";

export const validateSession = async () => {
  const session = await getSession();

  const sessionDB = await checkSession(session.sessionId!);

  if (!sessionDB) {
    session.destroy();
  }
};
