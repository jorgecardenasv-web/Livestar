import { getSessionsService } from "../services/get-sessions.service";

export const getSessions = async (currentSessionId: string) => {
  return await getSessionsService({ currentSessionId });
};
