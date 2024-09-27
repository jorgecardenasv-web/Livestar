import { SessionOptions } from "iron-session";
import { AuthenticadedUser } from "./types";

export interface SessionData {
  user: AuthenticadedUser;
  sessionId?: string;
  isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
  user: {
    id: "",
    email: "",
    name: "",
    role: null,
    status: null,
  },
  sessionId: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "auth_session",
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  },
};
