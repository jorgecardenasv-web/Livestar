'use server'

import { revalidatePath } from "next/cache";
import { deleteSessionService } from "../services/delete-session.service";
import { prefix } from "@/shared/utils/constants";

export const invalidateSession = async (sessionId: string) => {
  await deleteSessionService(sessionId);
  revalidatePath(`${prefix}/sesiones`);
  return true;
};