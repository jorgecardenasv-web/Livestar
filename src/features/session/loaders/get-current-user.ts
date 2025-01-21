"use server";

import { getSession } from "@/lib/iron-session/get-session";
import { getCurrentUserService } from "../services/get-current-user.service";

export const getCurrentUser = async () => {
  const { user } = await getSession()
  return await getCurrentUserService(user.id);
};