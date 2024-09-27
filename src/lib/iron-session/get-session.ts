'use server';

import { SessionData, defaultSession, sessionOptions } from "./session";
import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.user = defaultSession.user;
    session.sessionId = defaultSession.sessionId;
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}